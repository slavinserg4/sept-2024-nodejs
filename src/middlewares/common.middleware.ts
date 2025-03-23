import { Request, Response, NextFunction } from "express";
import { isObjectIdOrHexString } from "mongoose";
import { ApiError } from "../errors/api.error";
import { ObjectSchema } from "joi";
import { ITokenPayload } from "../interfaces/token.interface";
import { userService } from "../services/user.service";

class CommonMiddleware {
    public isIdValidate(key: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const { id } = req.params;
                if (!isObjectIdOrHexString(id)) {
                    throw new ApiError(`Invalide id:${id}`, 400);
                }
                next();
            } catch (e) {
                next(e);
            }
        };
    }
    public validateBody(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                req.body = await validator.validateAsync(req.body);
                next();
            } catch (e) {
                next(new ApiError(e.details[0].message, 400));
            }
        };
    }
    public async isUserAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const tokenPayload = res.locals.tokenPayload as ITokenPayload;
            const userId = tokenPayload.userId;
            await userService.isUserAdmin(userId);
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const commonMiddleware = new CommonMiddleware();
