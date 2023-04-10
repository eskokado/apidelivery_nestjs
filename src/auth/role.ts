import { Injectable } from '@nestjs/common';

@Injectable()
export class Role {
  ADMIN = { code: 1, description: 'Admin' };
  USER = { code: 2, description: 'User' };

  toEnum(code: number) {
    const state = Object.values(this).find((s) => s.code === code);
    if (!state) {
      throw new Error(`Invalid state code: ${code}`);
    }
    return state;
  }
}
