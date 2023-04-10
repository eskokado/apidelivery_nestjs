import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
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
  @Post(':id/delivered')
  async updateOrderStatusToDelivered(@Param('id', ParseIntPipe) id: number) {
    const result = await this.orderService.updateOrderStatusToDelivered(id);
    return { result };
  }
  @Post(':id/cancel')
  async updateOrderStatusToCanceled(@Param('id', ParseIntPipe) id: number) {
    const result = await this.orderService.updateOrderStatusToCancelled(id);
    return { result };
  }

  @Get('/search')
  async search(@Param('term') term: string) {
    const result = await this.orderService.findOrdersByTerm(term);
    return result;
  }
}
