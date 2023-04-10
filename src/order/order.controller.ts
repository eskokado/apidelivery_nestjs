import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from "@nestjs/common";
import { CreateOrderRequestDto } from './dto/create-order-request.dto';
import { OrderService } from './order.service';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enum/role.enum';
import { RoleGuard } from '../guards/role.guard';
import { AuthGuard } from '../guards/auth.guard';

@UseGuards(AuthGuard, RoleGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() obj: CreateOrderRequestDto) {
    const result = await this.orderService.create(obj);
    return { result };
  }
  @Roles(Role.ADMIN)
  @Post(':id/delivered')
  async updateOrderStatusToDelivered(@Param('id', ParseIntPipe) id: number) {
    const result = await this.orderService.updateOrderStatusToDelivered(id);
    return { result };
  }
  @Roles(Role.ADMIN)
  @Post(':id/cancel')
  async updateOrderStatusToCanceled(@Param('id', ParseIntPipe) id: number) {
    const result = await this.orderService.updateOrderStatusToCancelled(id);
    return { result };
  }

  @Roles(Role.USER)
  @Get('/search')
  async search(@Query('term') term: string) {
    const result = await this.orderService.findOrdersByTerm(term);
    return result;
  }
}
