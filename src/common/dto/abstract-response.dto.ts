import { Expose } from 'class-transformer';

export class AbstractResponseDto {
  @Expose()
  id!: number;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;
}
