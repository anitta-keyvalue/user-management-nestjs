import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionsRepository } from './permissions.repository';
import HttpException from '../execeptions/httpException';
import Permission from '../entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(private readonly permissionsRepository: PermissionsRepository) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const permission = await this.permissionsRepository.findByName(
      createPermissionDto.name,
    );
    if (permission) {
      throw new HttpException(400, 'Permission already existing');
    }
    return await this.permissionsRepository.createPermission(
      createPermissionDto.name,
    );
  }

  async findAll(): Promise<Permission[]> {
    return await this.permissionsRepository.getAll();
  }

  async findOne(id: string): Promise<Permission | null> {
    return await this.permissionsRepository.findById(Number(id));
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const permission = await this.permissionsRepository.findByName(
      updatePermissionDto.name ?? '',
    );
    if (!permission) {
      throw new HttpException(400, 'Permission already existing');
    }
    const existingPermission = await this.permissionsRepository.findByName(
      updatePermissionDto.name ?? '',
    );
    if (existingPermission) {
      throw new HttpException(400, 'Permission with name already existing');
    }
    return await this.permissionsRepository.updatePermission(
      id,
      updatePermissionDto,
    );
  }

  async remove(id: number) {
    return await this.permissionsRepository.deletePermission(id);
  }
}
