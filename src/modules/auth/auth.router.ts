import { Router } from "express";
import { AuthController } from "./auth.controller";
import { Validate, validate } from "class-validator";
import { RegisterDTO } from "./dto/register.dto";
import { validateBody } from "../../middlewares/validate.middleware";

export class AuthRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.initializedRoutes();
  }

  private initializedRoutes = () => {
    this.router.post(
      "/register",
      validateBody(RegisterDTO),
      this.authController.register
    );
  };

  getRouter = () => {
    return this.router;
  };
}
