import { IsInt, IsNotEmpty } from 'class-validator';

export class AddPermissionDto {
  @IsInt({})
  @IsNotEmpty()
  roleId!: number;
  @IsInt({})
  @IsNotEmpty()
  permissionId!: number;
}
