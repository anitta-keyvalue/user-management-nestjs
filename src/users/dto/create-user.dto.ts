import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @MinLength(3)
  @MaxLength(20)
  name!: string;

  @IsString()
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @MinLength(3)
  @MaxLength(20)
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(8)
  @MaxLength(32)
  password!: string;
}
