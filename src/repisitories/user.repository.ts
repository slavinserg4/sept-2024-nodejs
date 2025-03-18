import { IUser, IUserDTO } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
    public getAll(): Promise<IUser[]> {
        return User.find();
    }
    public create(user: IUserDTO): Promise<IUser> {
        return User.create(user);
    }
    public getById(userId: string): Promise<IUser> {
        return User.findById(userId);
    }
    public update(userId: string, userData: IUserDTO): Promise<IUser> {
        return User.findByIdAndUpdate(userId, userData);
    }
    public delete(userId: string) {
        return User.findByIdAndDelete(userId);
    }
}

export const userRepository = new UserRepository();
