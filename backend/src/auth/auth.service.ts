import {
  ConflictException,
  HttpException,
  Injectable,
  Inject,
  Logger,
  UnauthorizedException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import jwtConfig from 'src/shared/config/jwt.config';
import { UserRepository } from 'src/user/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from 'src/user/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { Token } from 'src/shared/types/token.interface';
import { User } from 'src/shared/types/user.interface';
import { createJWTPayload } from 'src/shared/utils/jwt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  public async register(dto: CreateUserDto) {
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    const userEntity = await new UserEntity({
      ...dto,
      passwordHash: '',
    }).setPassword(dto.password);

    const newUser = await this.userRepository.save(userEntity);
    return newUser;
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existingUser = await this.userRepository.findByEmail(email);

    if (!existingUser) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    const isCorrectPassword = await existingUser.comparePassword(password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    return existingUser;
  }

  public async createUserToken(user: User): Promise<Token> {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = {
      ...accessTokenPayload,
      tokenId: crypto.randomUUID(),
    };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);
    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(
        refreshTokenPayload,
        {
          secret: this.jwtOptions.refreshTokenSecret,
          expiresIn: this.jwtOptions.refreshTokenExpiresIn,
        },
      );
      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException(
        'Ошибка при создании токена.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getUserByEmail(email: string) {
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(`Пользователь с email ${email} не найден`);
    }

    return existUser;
  }

  public async updateProfile(id: string, dto: UpdateUserDto) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`Пользователь с ID ${id} не найден`);
    }
    const updatedUser = new UserEntity({ ...user, ...dto, id });
    await this.userRepository.update(updatedUser);
    return updatedUser;
  }
}
