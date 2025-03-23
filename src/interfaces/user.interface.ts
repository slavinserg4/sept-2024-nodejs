import { IBase } from "./base.interface";
import { RoleEnum } from "../enums/role.enum";

interface IUser extends IBase {
    _id: string;
    name: string;
    surname: string;
    age: number;
    email: string;
    password: string;
    role: RoleEnum;
    isDeleted: boolean;
    isVerified: boolean;
    isActive: boolean;
}

type IUserCreateDTO = Pick<
    IUser,
    "email" | "password" | "name" | "surname" | "age"
>;
type IUserUpdateDTO = Partial<
    Pick<IUser, "name" | "surname" | "age" | "isActive">
>;

export type { IUser, IUserUpdateDTO, IUserCreateDTO };
