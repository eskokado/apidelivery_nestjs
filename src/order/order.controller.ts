import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderRequestDto } from './dto/create-order-request.dto';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() obj: CreateOrderRequestDto) {
    const result = await this.orderService.create(obj);
    return { result };
  }
}
