export interface IUser {
    _id: string;
    name: string;
    surname: string;
    age: number;
    createdAt: Date;
    updatetAt: Date;
}

export type IUserDTO = Pick<IUser, "name" | "surname" | "age">;
