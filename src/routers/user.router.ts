import { Router } from "express";
import { userController } from "../controlers/user.controler";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", userController.getAll);
router.get("/:id", commonMiddleware.isIdValidate("id"), userController.getById);
router.put(
    "/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.isIdValidate("id"),
    commonMiddleware.validateBody(UserValidator.update),
    userController.update,
);

router.delete(
    "/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.isIdValidate("id"),
    userController.delete,
);

export const userRouter = router;
