import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import HttpException from '../execeptions/httpException';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private roleService: RolesService,
  ) {}

  async login(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    console.log('auth service user ', user);
    if (user) {
      const isMatch = user ? await bcrypt.compare(pass, user.password) : false;

      if (!isMatch) {
        throw new HttpException(400, 'Invalid credentials');
      }

      const role = await this.roleService.findOne(String(user?.role?.id));
      const userWithPerms =
        await this.usersService.findOneWithPermissions(email);

      console.log('user permisiions ', userWithPerms);

      const permissions =
        userWithPerms?.role?.rolePermissions?.map((rp) => rp.permission.name) ||
        [];

      const payload = {
        sub: user?.id,
        email: user?.email,
        role: role?.name,
        permissions: permissions,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new HttpException(400, 'User not found');
    }
  }
}
