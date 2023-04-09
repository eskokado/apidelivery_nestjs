import { Module } from "@nestjs/common";
import { SupplierService } from "./supplier.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [SupplierService],
  exports: [SupplierService],
})
export class SupplierModule {

}
