import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}
export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export class UserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsEnum(Gender, {
    message: 'gender must be either male or female',
  })
  readonly gender: Gender;

  @IsNotEmpty()
  @IsEnum(Role, {
    message: 'Role must be either admin or user',
  })
  readonly role: Role;
}
