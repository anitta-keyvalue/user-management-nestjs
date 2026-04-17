import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import HttpException from '../execeptions/httpException';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { Permission } from '../auth/constants/permissions.enum';
import { UserResponseDto } from './dto/user-response.dto';

@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @RequirePermissions(Permission.CreateUser)
  async create(@Body() createUserDto: CreateUserDto) {
    const object = plainToInstance(CreateUserDto, createUserDto);

    const errors = await validate(object);

    if (errors.length > 0) {
      const formattedErrors = errors.map((error) => ({
        property: error.property,
        constraints: error.constraints,
        value: error.value,
      }));
      throw new HttpException(
        400,
        JSON.stringify({
          message: 'Validation failed',
          errors: formattedErrors,
        }),
      );
    }
    const respose = this.usersService.create(createUserDto);
    return plainToInstance(UserResponseDto, respose, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  @RequirePermissions(Permission.ReadUser)
  findAll() {
    const users = this.usersService.findAll();
    return plainToInstance(UserResponseDto, users, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  @RequirePermissions(Permission.ReadUser)
  findOne(@Param('id') id: string) {
    const user = this.usersService.findOne(id);
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  @RequirePermissions(Permission.EditUser)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = this.usersService.update(+id, updateUserDto);
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  @RequirePermissions(Permission.EditUser)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post(':id/roles/:roleId')
  addRole(@Param('id') id: number, @Param('roleId') roleId: number) {
    return this.usersService.addRole(id, roleId);
  }

  @Delete(':id/roles/:roleId')
  removeRole(@Param('id') id: number, @Param('roleId') roleId: number) {
    return this.usersService.removeRole(id, roleId);
  }
}
