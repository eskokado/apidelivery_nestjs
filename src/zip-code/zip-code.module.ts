import { Module } from "@nestjs/common";
import { ZipCodeService } from "./zip-code.service";

@Module({
  imports: [],
  controllers: [],
  providers: [ZipCodeService],
  exports: [ZipCodeService],
})
export class ZipCodeModule {}
