import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductController } from './product.controller';
import { StateDeliveryModule } from '../enum/state-delivery.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, StateDeliveryModule, AuthModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
