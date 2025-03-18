import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { IUserDTO } from "../interfaces/user.interface";
import { StatusCodesEnum } from "../enums/status-codes.enum";

class UserController {
    public async getAll(req: Request, res: Response) {
        const users = await userService.getAll();
        res.status(StatusCodesEnum.OK).json(users);
    }
    public async create(req: Request, res: Response) {
        const user: IUserDTO = req.body;
        const data = userService.create(user);
        res.status(StatusCodesEnum.CREATED).json(data);
    }
    public async getById(req: Request, res: Response) {
        const id = req.params.id;
        const user = await userService.getById(id);
        res.status(StatusCodesEnum.OK).json(user);
    }
    public async update(req: Request, res: Response) {
        const id = req.params.id;
        const userData = req.body;
        const user = await userService.update(id, userData);
        res.status(StatusCodesEnum.OK).json(user);
    }
    public async delete(req: Request, res: Response) {
        const id = req.params.id;
        const user = await userService.delete(id);
        res.status(StatusCodesEnum.NO_CONTENT).json(user);
    }
}
export const userController = new UserController();
