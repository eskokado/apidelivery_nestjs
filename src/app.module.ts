import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { SwaggerModule } from '@nestjs/swagger';

@Module({
  imports: [OrderModule, PrismaModule, AuthModule, SwaggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
