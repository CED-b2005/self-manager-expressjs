import { UserDto } from "../../../../common/dtos/user.dto";

export class AuthResponseDto {
  user!: UserDto;
  token!: string;
}
