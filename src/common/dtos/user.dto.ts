import { Expose } from "class-transformer";

export class UserDto {
    @Expose()
    id!: string;

    @Expose()
    email!: string;

    @Expose()
    name!: string;

    @Expose()
    phone?: string;

    @Expose()
    role!: string;

    @Expose()
    avatar?: String;

    @Expose()
    isActive!: boolean;
}