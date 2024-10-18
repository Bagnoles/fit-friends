import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BalanceService } from './balance.service';
import { InjectUserIdInterceptor } from 'src/shared/interceptors/inject-user-id.interceptor';
import { BalanceDto } from './dto/balance.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { fillDto } from 'src/shared/utils/common';
import { BalanceRdo } from './rdo/balance.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('balance')
@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @ApiResponse({
    type: BalanceRdo,
    status: HttpStatus.OK,
    description: 'Get user balance',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access denied',
  })
  @UseGuards(JwtAuthGuard)
  @Get('/:userId')
  public async index(@Param('userId') userId: string) {
    const result = await this.balanceService.getBalance(userId);
    return fillDto(BalanceRdo, result);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Add to user balance',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access denied',
  })
  @UseInterceptors(InjectUserIdInterceptor)
  @UseGuards(JwtAuthGuard)
  @Post('/')
  public async add(@Body() dto: BalanceDto) {
    const result = await this.balanceService.addToBalance(
      dto.userId,
      dto.workoutId,
      dto.count,
    );
    return result;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete from user balance',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access denied',
  })
  @UseInterceptors(InjectUserIdInterceptor)
  @UseGuards(JwtAuthGuard)
  @Post('/delete')
  public async delete(@Body() dto: BalanceDto) {
    const result = await this.balanceService.deleteFromBalance(
      dto.userId,
      dto.workoutId,
    );
    return result;
  }
}
