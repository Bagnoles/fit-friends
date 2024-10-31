import {
  Controller,
  Body,
  Post,
  HttpStatus,
  UseGuards,
  Req,
  HttpCode,
  Patch,
  Param,
  Get,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserEntity } from 'src/user/user.entity';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { TokenPayload } from 'src/shared/types/token-payload.interface';
import { fillDto } from 'src/shared/utils/common';
import { UserRdo } from './rdo/user.rdo';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileUploaderService } from 'src/file-uploader/file-uploader.service';

interface RequestWithUser {
  user?: UserEntity;
}
interface RequestWithTokenPayload {
  user?: TokenPayload;
}

@ApiTags('users')
@Controller('users')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly fileService: FileUploaderService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already exist',
  })
  @Post('register')
  @UseInterceptors(FileInterceptor('file'))
  public async create(
    @Body() dto: CreateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    let avatarId = '';
    if (file) {
      const fileEntity = await this.fileService.saveFile(file);
      avatarId = fileEntity.id;
    }
    const user = await this.authService.register({ ...dto, avatarId });
    const result = user.avatarId
      ? fillDto(UserRdo, {
          ...user.toPOJO(),
          avatar: (await this.fileService.getFile(user.avatarId)).toPOJO(),
        })
      : fillDto(UserRdo, user.toPOJO());
    return result;
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User succesfully logged',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Email or password invalid',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() { user }: RequestWithUser) {
    const userToken = await this.authService.createUserToken(user);
    return fillDto(LoggedUserRdo, { ...user.toPOJO(), ...userToken });
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'User profile updated',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error',
  })
  @UseGuards(JwtAuthGuard)
  @Patch('/:userId')
  public async update(@Param('userId') id: string, @Body() dto: UpdateUserDto) {
    const updatedUser = await this.authService.updateProfile(id, dto);
    return fillDto(UserRdo, updatedUser.toPOJO());
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'Get user info',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @UseGuards(JwtAuthGuard)
  @Get('/:userId')
  public async getInfo(@Param('userId') id: string) {
    const user = await this.authService.getUserById(id);
    const result = user.avatarId
      ? fillDto(UserRdo, {
          ...user.toPOJO(),
          avatar: (await this.fileService.getFile(user.avatarId)).toPOJO(),
        })
      : fillDto(UserRdo, user.toPOJO());
    return result;
  }
}
