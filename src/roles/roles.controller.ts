import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AddPermissionDto } from './dto/add-permission.dto';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { Permission } from '../auth/constants/permissions.enum';

@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @RequirePermissions(Permission.CreateRole)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @RequirePermissions(Permission.ReadRole)
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @RequirePermissions(Permission.ReadRole)
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @RequirePermissions(Permission.EditRole)
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @RequirePermissions(Permission.DeleteRole)
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }

  @Post('addPermission')
  @RequirePermissions(Permission.CreateRole)
  addPermission(@Body() addPermissionDto: AddPermissionDto) {
    return this.rolesService.addPermission(addPermissionDto);
  }

  @Delete(':roleId/permissions/:permissionId')
  @RequirePermissions(Permission.DeleteUser)
  removePermission(
    @Param('roleId') roleId: number,
    @Param('permissionId') permissionId: number,
  ) {
    return this.rolesService.removePermission(roleId, permissionId);
  }
}
