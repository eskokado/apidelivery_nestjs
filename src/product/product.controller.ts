import {
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enum/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(AuthGuard, RoleGuard)
@Controller('products')
@ApiBearerAuth()
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(private readonly productService: ProductService) {}
  @Roles(Role.ADMIN)
  @Get(':id/ordersItems')
  async getListOrderItemsByProductId(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.findOrderItemsByProductId(id);
  }
}
