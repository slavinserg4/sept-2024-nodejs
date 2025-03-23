import { Request, Response, NextFunction } from "express";
import { userService } from "../services/user.service";
import { IUserCreateDTO, IUserUpdateDTO } from "../interfaces/user.interface";
import { StatusCodesEnum } from "../enums/status-codes.enum";

class UserController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAll();
            res.status(StatusCodesEnum.OK).json(users);
        } catch (e) {
            next(e);
        }
    }
    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user: IUserCreateDTO = req.body;
            const data = userService.create(user);
            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }
    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const user = await userService.getById(id);
            res.status(StatusCodesEnum.OK).json(user);
        } catch (e) {
            next(e);
        }
    }
    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const userData: IUserUpdateDTO = req.body;
            const user = await userService.update(id, userData);
            res.status(StatusCodesEnum.OK).json(user);
        } catch (e) {
            next(e);
        }
    }
    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const user = await userService.delete(id);
            res.status(StatusCodesEnum.NO_CONTENT).json(user);
        } catch (e) {
            next(e);
        }
    }
}
export const userController = new UserController();
