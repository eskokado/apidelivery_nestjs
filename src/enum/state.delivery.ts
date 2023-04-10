import { Injectable } from '@nestjs/common';

@Injectable()
export class StateDelivery {
  PENDING = { code: 1, description: 'Pending' };
  DELIVERED = { code: 2, description: 'Delivered' };
  CANCELED = { code: 3, description: 'Canceled' };

  toEnum(code: number) {
    const state = Object.values(this).find((s) => s.code === code);
    if (!state) {
      throw new Error(`Invalid state code: ${code}`);
    }
    return state;
  }
}
