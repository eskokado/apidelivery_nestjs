import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PrismaModule } from '../prisma/prisma.module';
import { SupplierModule } from '../supplier/supplier.module';
import { ClientModule } from '../client/client.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [PrismaModule, SupplierModule, ClientModule, ProductModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [],
})
export class OrderModule {}
