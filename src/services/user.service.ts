import {
    IUser,
    IUserCreateDTO,
    IUserUpdateDTO,
} from "../interfaces/user.interface";
import { userRepository } from "../repisitories/user.repository";
import { ApiError } from "../errors/api.error";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { RoleEnum } from "../enums/role.enum";

class UserService {
    public getAll(): Promise<IUser[]> {
        return userRepository.getAll();
    }
    public create(user: IUserCreateDTO): Promise<IUser> {
        return userRepository.create(user);
    }
    public async getById(userId: string): Promise<IUser> {
        const user = await userRepository.getById(userId);
        if (!user) {
            throw new ApiError("User Not Found", StatusCodesEnum.NOT_FOUND);
        }
        return user;
    }
    public async update(
        userId: string,
        userData: IUserUpdateDTO,
    ): Promise<IUser> {
        const user = await userRepository.getById(userId);
        if (!user) {
            throw new ApiError("User Not Found", StatusCodesEnum.NOT_FOUND);
        }
        return await userRepository.update(userId, userData);
    }
    public async delete(userId: string): Promise<void> {
        const user = await userRepository.getById(userId);
        if (!user) {
            throw new ApiError("User Not Found", StatusCodesEnum.NOT_FOUND);
        }
        await userRepository.delete(userId);
    }
    public async isEmailUnique(email: string): Promise<void> {
        const user = await userRepository.getByEmail(email);
        if (user) {
            throw new ApiError(
                "User is already exists",
                StatusCodesEnum.BED_REQUEST,
            );
        }
    }
    public async isUserAdmin(userId: string) {
        const user = await userRepository.getById(userId);
        if (user.role != RoleEnum.ADMIN) {
            throw new ApiError(
                "You have not rules to set user active",
                StatusCodesEnum.UNAUTHORIZED,
            );
        }
    }
    public async setUserActive(userId: string) {
        const user = await userRepository.getById(userId);
        const dataToUpdate = !user.isActive;
        return await userRepository.update(userId, { isActive: dataToUpdate });
    }
}

export const userService = new UserService();
