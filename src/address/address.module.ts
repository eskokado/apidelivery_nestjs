import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AddressService } from './address.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
