import { Expose, Type } from 'class-transformer';
import { AbstractResponseDto } from '../../common/dto/abstract-response.dto';

export class RoleResponseDto extends AbstractResponseDto {
  @Expose()
  name!: string;
}

export class UserResponseDto extends AbstractResponseDto {
  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  @Type(() => RoleResponseDto) // 👈 This handles the nested object transformation
  role!: RoleResponseDto;
}
