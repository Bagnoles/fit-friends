import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BalanceService } from './balance.service';
import { InjectUserIdInterceptor } from 'src/shared/interceptors/inject-user-id.interceptor';
import { BalanceDto } from './dto/balance.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:userId')
  public async index(@Param('userId') userId: string) {
    const result = await this.balanceService.getBalance(userId);
    return result;
  }

  @UseInterceptors(InjectUserIdInterceptor)
  @UseGuards(JwtAuthGuard)
  @Post('/')
  public async add(@Body() dto: BalanceDto) {
    const result = await this.balanceService.addToBalance(
      dto.userId,
      dto.workoutId,
    );
    return result;
  }

  @UseInterceptors(InjectUserIdInterceptor)
  @UseGuards(JwtAuthGuard)
  @Delete('/')
  public async delete(@Body() dto: BalanceDto) {
    const result = await this.balanceService.deleteFromBalance(
      dto.userId,
      dto.workoutId,
    );
    return result;
  }
}
