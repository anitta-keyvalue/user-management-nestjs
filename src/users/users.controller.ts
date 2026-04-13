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

@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @RequirePermissions(Permission.CreateUser)
  async create(@Body() createUserDto: CreateUserDto) {
    const object = plainToInstance(CreateUserDto, createUserDto);

    // Manually run the validation
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
    return this.usersService.create(createUserDto);
  }

  @Get()
  @RequirePermissions(Permission.ReadUser)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @RequirePermissions(Permission.ReadUser)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @RequirePermissions(Permission.EditUser)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @RequirePermissions(Permission.EditUser)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
