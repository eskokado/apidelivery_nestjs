import { Controller, Get, Logger, Param, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(private readonly productService: ProductService) {}
  @Get(':id/ordersItems')
  async getListOrderItemsByProductId(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.findOrderItemsByProductId(id);
  }
}
