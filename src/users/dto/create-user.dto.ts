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
  @IsNotEmpty({ message: 'Name name cannot be empty' })
  @MinLength(3)
  @MaxLength(20)
  name!: string;

  @IsString()
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email name cannot be empty' })
  @MinLength(3)
  @MaxLength(20)
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'Password name cannot be empty' })
  @MinLength(3)
  @MaxLength(20)
  password!: string;

  @IsInt({})
  @IsNotEmpty()
  roleId!: number;
}
