import { IUser, IUserCreateDTO } from "../interfaces/user.interface";
import { ITokenPair } from "../interfaces/token.interface";
import { userService } from "./user.service";
import { passwordService } from "./password.service";
import { userRepository } from "../repisitories/user.repository";
import { tokenService } from "./token.service";
import { tokenRepository } from "../repisitories/token.repository";
import { ApiError } from "../errors/api.error";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { IAuth } from "../interfaces/auth.interface";

class AuthService {
    public async signUp(
        user: IUserCreateDTO,
    ): Promise<{ user: IUser; tokens: ITokenPair }> {
        await userService.isEmailUnique(user.email);
        const password = await passwordService.hashPassword(user.password);
        const newUser = await userRepository.create({ ...user, password });
        const tokens = tokenService.generateTokens({
            userId: newUser._id,
            role: newUser.role,
        });
        await tokenRepository.create({ ...tokens, _userId: newUser._id });
        return { user: newUser, tokens: tokens };
    }
    public async signIn(
        dto: IAuth,
    ): Promise<{ user: IUser; tokens: ITokenPair }> {
        const user = await userRepository.getByEmail(dto.email);
        if (!user) {
            throw new ApiError(
                "Invalid email or password",
                StatusCodesEnum.UNAUTHORIZED,
            );
        }
        if (!user.isActive) {
            throw new ApiError(
                "User is not active",
                StatusCodesEnum.UNAUTHORIZED,
            );
        }
        const isValidPassword = await passwordService.comparePassword(
            dto.password,
            user.password,
        );
        if (!isValidPassword) {
            throw new ApiError(
                "Invalid email or password",
                StatusCodesEnum.UNAUTHORIZED,
            );
        }
        const tokens = tokenService.generateTokens({
            userId: user._id,
            role: user.role,
        });
        await tokenRepository.create({ ...tokens, _userId: user._id });
        return { user, tokens };
    }
}
export const authService = new AuthService();
