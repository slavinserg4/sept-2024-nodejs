import { Router } from "express";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";
import { authController } from "../controlers/auth.controler";
import { authMiddleware } from "../middlewares/auth.middleware";
import { AuthValidator } from "../validators/auth.validator";

const router = Router();
router.post(
    "/sign-up",
    commonMiddleware.validateBody(UserValidator.create),
    authController.signUp,
);

router.post("/sign-in", authController.signIn);
router.get("/me", authMiddleware.checkAccessToken, authController.me);
router.post(
    "/refresh",
    commonMiddleware.validateBody(AuthValidator.refreshToken),
    authMiddleware.checkRefreshToken,
    authController.refresh,
);
router.patch(
    "/set-active/:id",
    commonMiddleware.isIdValidate("id"),
    authMiddleware.checkAccessToken,
    commonMiddleware.isUserAdmin,
    authController.setActive,
);

export const authRouter = router;
