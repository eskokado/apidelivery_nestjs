import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<any> {
    const product = await this.prisma.products.findFirst({
      where: { id },
    });
    this.logger.log(`id: ${id} - ${product}`);
    if (!product) {
      const errorMessage = `Product not fount with the ID ${id}`;
      this.logger.error(errorMessage);
      return { error: errorMessage };
    }
    this.logger.log('Product found successfully!');
    return product;
  }
}
