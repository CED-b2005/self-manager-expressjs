import { IsEmail, IsNotEmpty, IsString, Length, Matches , IsEnum} from "class-validator";

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: "Username can only contain letters, numbers, and underscores",
  })
  name!: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  })
  password!: string;

  @IsString()
  @IsEnum(["user", "admin"])
  role!: string
}