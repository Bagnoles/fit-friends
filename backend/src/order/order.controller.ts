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
import { InjectUserIdInterceptor } from 'src/shared/interceptors/inject-user-id.interceptor';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Get('/')
  public async getCoachOrders(@Body() { userId }: { userId: string }) {
    const result = await this.orderService.getCoachOrders(userId);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:userId')
  public async index(@Param('userId') userId: string) {
    const result = await this.orderService.getUserOrders(userId);
    return result;
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Order created',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Access denied',
  })
  @UseInterceptors(InjectUserIdInterceptor)
  @UseGuards(JwtAuthGuard)
  @Post('/')
  public async create(@Body() dto: CreateOrderDto) {
    const result = await this.orderService.addOrder(dto);
    return result;
  }
}
