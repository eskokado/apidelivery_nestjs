import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { SupplierModule } from '../supplier/supplier.module';
import { ClientModule } from '../client/client.module';
import { ProductModule } from '../product/product.module';
import { ZipCodeModule } from '../zip-code/zip-code.module';
import { AddressModule } from '../address/address.module';
import { StateDeliveryModule } from '../enum/state-delivery.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthService } from "../auth/auth.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    SupplierModule,
    ClientModule,
    ProductModule,
    ZipCodeModule,
    AddressModule,
    PrismaModule,
    StateDeliveryModule,
    AuthModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [],
})
export class OrderModule {}
