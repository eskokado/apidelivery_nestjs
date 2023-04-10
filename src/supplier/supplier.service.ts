import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SupplierService {
  private readonly logger = new Logger(SupplierService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<any> {
    this.logger.log(`id: ${id}`);
    const supplier = await this.prisma.supplier.findFirst({
      where: { id: id },
    });
    this.logger.log(`id: ${id} - ${supplier}`);
    if (!supplier) {
      const errorMessage = `Supplier not fount with the ID ${id}`;
      this.logger.error(errorMessage);
      return { error: errorMessage };
    }
    this.logger.log('Supplier found successfully!');
    return supplier;
  }
}
