import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesRepository } from './roles.repository';
import Role from '../entities/role.entity';
import HttpException from '../execeptions/httpException';
import { PermissionsRepository } from '../permissions/permissions.repository';
import { AddPermissionDto } from './dto/add-permission.dto';

@Injectable()
export class RolesService {
  constructor(
    private readonly rolesRepository: RolesRepository,
    private readonly permissionRepository: PermissionsRepository,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = await this.rolesRepository.findByName(createRoleDto.name);
    if (role) {
      throw new HttpException(400, 'Role already existing');
    }
    return await this.rolesRepository.createRole(createRoleDto.name);
  }

  async findAll(): Promise<Role[]> {
    return await this.rolesRepository.getAll();
  }

  async findOne(id: string): Promise<Role | null> {
    return await this.rolesRepository.findById(Number(id));
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.rolesRepository.findByName(
      updateRoleDto.name ?? '',
    );
    if (role) {
      throw new HttpException(400, 'Role already existing');
    }
    return await this.rolesRepository.updateRole(id, updateRoleDto);
  }

  async remove(id: number) {
    return await this.rolesRepository.deleteRole(id);
  }

  async addPermission(addPermissionDto: AddPermissionDto) {
    const permission = await this.permissionRepository.findById(
      addPermissionDto.permissionId,
    );
    if (!permission) {
      throw new HttpException(
        400,
        'No permission found for id' + addPermissionDto.permissionId,
      );
    }
    const role = await this.rolesRepository.findById(addPermissionDto.roleId);
    if (!role) {
      throw new HttpException(
        400,
        'No role found for id' + addPermissionDto.roleId,
      );
    }
    return await this.rolesRepository.addPermission(
      addPermissionDto.roleId,
      addPermissionDto.permissionId,
    );
  }

  async removePermission(roleId: number, permissionId: number) {
    return await this.rolesRepository.removePermission(roleId, permissionId);
  }
}
