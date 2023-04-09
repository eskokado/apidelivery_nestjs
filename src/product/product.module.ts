import { Module } from '@nestjs/common';
import { PrismaModule } from "../prisma/prisma.module";
import { ProductService } from "./product.service";

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
