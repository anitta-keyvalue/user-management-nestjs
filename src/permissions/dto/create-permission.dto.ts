import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
export class CreatePermissionDto {
  @IsString()
  @IsNotEmpty({ message: 'Permission name cannot be empty' })
  @MinLength(3)
  @MaxLength(20)
  name!: string;
}
