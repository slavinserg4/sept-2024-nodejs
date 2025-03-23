import { Request, Response, NextFunction } from "express";
import { IUserCreateDTO } from "../interfaces/user.interface";
import { authService } from "../services/auth.service";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { IAuth } from "../interfaces/auth.interface";
import { ITokenPayload } from "../interfaces/token.interface";
import { userService } from "../services/user.service";
import { tokenService } from "../services/token.service";
import { tokenRepository } from "../repisitories/token.repository";

class AuthController {
    public async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body as IUserCreateDTO;
            const data = await authService.signUp(user);
            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }
    public async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body as IAuth;
            const data = await authService.signIn(user);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }
    public async me(req: Request, res: Response, next: NextFunction) {
        try {
            const tokenPayload = res.locals.tokenPayload as ITokenPayload;
            const userId = tokenPayload.userId;
            const user = userService.getById(userId);
            res.status(StatusCodesEnum.OK).json(user);
        } catch (e) {
            next(e);
        }
    }
    public async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { role, userId } = req.res.locals
                .tokenPayload as ITokenPayload;
            const tokens = tokenService.generateTokens({ role, userId });
            await tokenRepository.create({
                ...tokens,
                _userId: userId,
            });
            res.status(StatusCodesEnum.OK).json(tokens);
        } catch (e) {
            next(e);
        }
    }
    public async setActive(req: Request, res: Response, next: NextFunction) {
        try {
            const userToActiveId = req.params.id;
            const updatedUser = await userService.setUserActive(userToActiveId);
            res.status(StatusCodesEnum.OK).json(updatedUser);
        } catch (e) {
            next(e);
        }
    }
}
export const authController = new AuthController();
