import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty({ message: 'Role name cannot be empty' })
  @MinLength(3)
  @MaxLength(20)
  name!: string;
}
