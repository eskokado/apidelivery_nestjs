import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
