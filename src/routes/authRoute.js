import { UserController } from "../controllers";
import { Authorization } from "../middlewares";
import Validate from "../validation";

const authRoutes = (app) => {
  app.post(
    "/api/v1/auth/signup",
    Validate.validateUserInput,
    UserController.signUp
  );
  app.post(
    "/api/v1/auth/login",
    Validate.validateUserLogin,
    UserController.login
  );
};

export default authRoutes;
