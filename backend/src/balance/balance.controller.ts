import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { BalanceService } from './balance.service';
import { InjectUserIdInterceptor } from 'src/shared/interceptors/inject-user-id.interceptor';
import { BalanceDto } from './dto/balance.dto';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get('/:userId')
  public async index(@Param('userId') userId: string) {
    const result = await this.balanceService.getBalance(userId);
    return result;
  }

  @UseInterceptors(InjectUserIdInterceptor)
  @Post('/')
  public async add(@Body() dto: BalanceDto) {
    const result = await this.balanceService.addToBalance(
      dto.userId,
      dto.workoutId,
    );
    return result;
  }

  @UseInterceptors(InjectUserIdInterceptor)
  @Delete('/')
  public async delete(@Body() dto: BalanceDto) {
    const result = await this.balanceService.deleteFromBalance(
      dto.userId,
      dto.workoutId,
    );
    return result;
  }
}
