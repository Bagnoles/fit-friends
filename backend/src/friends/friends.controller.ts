import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectUserIdInterceptor } from 'src/shared/interceptors/inject-user-id.interceptor';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FriendsService } from './friends.service';

@ApiTags('friends')
@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get user friends',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access denied',
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Get('/')
  public async index(@Body() { userId }: { userId: string }) {
    const result = await this.friendsService.getFriends(userId);
    return result
      .flatMap((item) => [item.user1, item.user2])
      .filter((item) => item.id !== userId);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Add user friend',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access denied',
  })
  @UseInterceptors(InjectUserIdInterceptor)
  @UseGuards(JwtAuthGuard)
  @Post('/')
  public async add(
    @Body() { userId, friendId }: { userId: string; friendId: string },
  ) {
    const result = await this.friendsService.saveFriend(userId, friendId);
    return result;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete from friends',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access denied',
  })
  @UseInterceptors(InjectUserIdInterceptor)
  @UseGuards(JwtAuthGuard)
  @Post('/delete')
  public async delete(
    @Body() { userId, friendId }: { userId: string; friendId: string },
  ) {
    const result = await this.friendsService.deleteFriend(userId, friendId);
    return result;
  }
}
