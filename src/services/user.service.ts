import { IUser, IUserDTO } from "../interfaces/user.interface";
import { userRepository } from "../repisitories/user.repository";

class UserService {
    public getAll(): Promise<IUser[]> {
        return userRepository.getAll();
    }
    public create(user: IUserDTO): Promise<IUser> {
        return userRepository.create(user);
    }
    public getById(userId: string): Promise<IUser> {
        return userRepository.getById(userId);
    }
    public update(userId: string, userData: IUserDTO): Promise<IUser> {
        return userRepository.update(userId, userData);
    }
    public delete(userId: string) {
        return userRepository.delete(userId);
    }
}

export const userService = new UserService();
