import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
