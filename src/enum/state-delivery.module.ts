import { Module } from '@nestjs/common';
import { StateDelivery } from './state.delivery';

@Module({
  imports: [],
  controllers: [],
  providers: [StateDelivery],
  exports: [StateDelivery],
})
export class StateDeliveryModule {}
