import { Injectable } from '@nestjs/common';
import { Role } from '../enum/role.enum';

@Injectable()
export class UserPojo {
  username: string;
  password: string;
  role: Role;

  constructor(username: string, password: string, role: Role) {
    this.username = username;
    this.password = password;
    this.role = role;
  }
  static findByUserName(username: string) {
    const userUsername = 'user';
    const userPassword =
      '$2b$10$RrqlgVQTyd3IlzqL37SLj.3pPK0VJbg4fcnQBQDv9/VspjnEOEaEy';

    const adminUsername = 'admin';
    const adminPassword =
      '$2b$10$lgSZobvrRPHON40.V1vdiefbsMkcGkzyuYUj84k.lO.1DKscKdc.m';
    if (username.includes(userUsername)) {
      return new UserPojo(userUsername, userPassword, Role.USER);
    } else if (username.includes(adminUsername)) {
      return new UserPojo(adminUsername, adminPassword, Role.ADMIN);
    } else {
      return null;
    }
  }
}
