import { Router } from "express";
import { userController } from "../controlers/user.controler";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getAll);
router.post(
    "/",
    commonMiddleware.validateBody(UserValidator.create),
    userController.create,
);
router.get("/:id", userController.getById);
router.put("/:id",commonMiddleware.validateBody(UserValidator.update), userController.update);
router.delete("/:id", userController.delete);

export const userRouter = router;
