import { MinLength, Length, IsEmail, IsNotEmpty, IsEnum } from 'class-validator'
export class CreateUserDto {

    @IsNotEmpty()
    @MinLength(1)
    name!: string;

    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @MinLength(6)
    password!: string;

    @IsNotEmpty()
    @IsEnum(["admin, user"])
    role!: string;
}