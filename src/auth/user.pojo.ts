import { Injectable } from '@nestjs/common';
import { Role } from './role';

@Injectable()
export class UserPojo {
  username: string;
  password: string;
  roles: Role[];

  constructor(username: string, password: string, roles: Role[]) {
    this.username = username;
    this.password = password;
    this.roles = roles;
  }
  static findByUserName(username: string) {
    const role = new Role();
    const userUsername = 'user';
    const userPassword =
      '$2b$10$RrqlgVQTyd3IlzqL37SLj.3pPK0VJbg4fcnQBQDv9/VspjnEOEaEy';

    const adminUsername = 'admin';
    const adminPassword =
      '$2b$10$lgSZobvrRPHON40.V1vdiefbsMkcGkzyuYUj84k.lO.1DKscKdc.m';
    if (username.includes(userUsername)) {
      return new UserPojo(userUsername, userPassword, [
        role.toEnum(role.USER.code),
      ]);
    } else if (username.includes(adminUsername)) {
      return new UserPojo(adminUsername, adminPassword, [
        role.toEnum(role.ADMIN.code),
      ]);
    } else {
      return null;
    }
  }
}
