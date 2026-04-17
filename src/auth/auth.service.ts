import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import HttpException from '../execeptions/httpException';
import { RolesService } from '../roles/roles.service';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const isMatch = user ? await bcrypt.compare(pass, user.password) : false;

      if (!isMatch) {
        throw new HttpException(400, 'Invalid credentials');
      }

      const roles = user.userRoles.map((ur) => ur.role.name);

      const permissions = [
        ...new Set(
          user.userRoles.flatMap((ur) =>
            ur.role.rolePermissions.map((rp) => rp.permission.name),
          ),
        ),
      ];

      const payload = {
        sub: user?.id,
        email: user?.email,
        role: roles,
        permissions: permissions,
      };

      const accessToken = this.jwtService.sign(payload, {
        secret: process.env.ACCESS_SECRET,
        expiresIn: '15m',
      });

      const refreshToken = this.jwtService.sign(payload, {
        secret: process.env.REFRESH_SECRET,
        expiresIn: '7d',
      });
      return {
        access_token: accessToken,
        refreshToken: refreshToken,
      };
    } else {
      throw new HttpException(400, 'Invalid credentials');
    }
  }

  async refreshToken(token: string) {
    const payload = this.jwtService.verify(token, {
      secret: process.env.REFRESH_SECRET,
    });

    const user = await this.usersService.findByEmail(payload?.email);
    if (!user || user.refreshtoken !== token) {
      throw new HttpException(400, 'Invalid credentials');
    }
    const roles = user.userRoles.map((ur) => ur.role.name);

    const permissions = [
      ...new Set(
        user.userRoles.flatMap((ur) =>
          ur.role.rolePermissions.map((rp) => rp.permission.name),
        ),
      ),
    ];

    const newPayload = {
      sub: user?.id,
      email: user?.email,
      role: roles,
      permissions: permissions,
    };

    const accessToken = this.jwtService.sign(newPayload, {
      secret: process.env.ACCESS_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(newPayload, {
      secret: process.env.REFRESH_SECRET,
      expiresIn: '7d',
    });

    await this.usersService.updateRefreshToken(
      Number(newPayload?.sub),
      refreshToken,
    );
    return {
      access_token: accessToken,
      refreshToken: refreshToken,
    };
  }

  async logout(token: string) {
    const payload = this.jwtService.verify(token, {
      secret: process.env.ACCESS_SECRET,
    });
    await this.usersService.updateRefreshToken(Number(payload?.sub), '');
  }
}
