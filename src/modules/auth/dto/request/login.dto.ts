import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginWithEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}

export class LoginWithNamelDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
