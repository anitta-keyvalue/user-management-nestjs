import { DataSource, DeleteResult, Repository } from 'typeorm';
import HttpException from '../execeptions/httpException';
import { Injectable } from '@nestjs/common';
import Permission from '../entities/permission.entity';

@Injectable()
export class PermissionsRepository extends Repository<Permission> {
  constructor(dataSource: DataSource) {
    super(Permission, dataSource.createEntityManager());
  }

  async findByName(name: string): Promise<Permission | null> {
    return await this.findOne({ where: { name: name } });
  }

  async findById(id: number): Promise<Permission | null> {
    return await this.findOneBy({ id });
  }

  async getAll(): Promise<Permission[]> {
    return await this.find();
  }

  async updatePermission(
    id: number,
    data: Partial<Permission>,
  ): Promise<Permission> {
    const permission = await this.findOneBy({ id });
    if (!permission) {
      throw new HttpException(400, 'Permission not found');
    }
    return await this.save({ ...data, id });
  }

  async createPermission(role: string): Promise<Permission> {
    return await this.save({ name: role });
  }

  async deletePermission(id: number): Promise<DeleteResult> {
    const role = await this.findOneBy({ id });
    if (!role) {
      throw new HttpException(400, 'Permission not found');
    }
    return await this.delete(id);
  }
}
