import { Router } from "express";
import { AuthController } from "./auth.controller";
import { Validate, validate } from "class-validator";
import { RegisterDTO } from "./dto/register.dto";
import { validateBody } from "../../middlewares/validate.middleware";
import { LoginDTO } from "./dto/login.dto";
import { ForgotPasswordDTO } from "./dto/forgot-password.dto";
import { JwtMiddleware } from "../../middlewares/jwt.middleware";
import { ResetPasswordDTO } from "./dto/reset-password.dto";

export class AuthRouter {
  private router: Router;
  private authController: AuthController;
  private jwtMiddleware: JwtMiddleware;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.jwtMiddleware = new JwtMiddleware();
    this.initializedRoutes();
  }

  private initializedRoutes = () => {
    this.router.post(
      "/register",
      validateBody(RegisterDTO),
      this.authController.register
    );
    this.router.post(
      "/login",
      validateBody(LoginDTO),
      this.authController.login
    );
    this.router.post(
      "/forgot-password",
      validateBody(ForgotPasswordDTO),
      this.authController.forgotPassword
    );
    this.router.patch(
      "/reset-password",
      this.jwtMiddleware.verifyToken(process.env.JWT_SECRET_RESET!),
      validateBody(ResetPasswordDTO),
      this.authController.resetPassword
    );
  };

  getRouter = () => {
    return this.router;
  };
}
