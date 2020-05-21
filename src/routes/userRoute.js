import { UserController } from '../controllers';
import { Authorization } from '../middlewares';
import Validate from '../validation';

const userRoutes = app => {
  app.patch(
    '/api/v1/profile',
    Authorization.checkToken,
    Authorization.confirmUser,
    Validate.validateUpdateProfile,
    UserController.updateProfile
  );
  app.get(
    '/api/v1/profile',
    Authorization.checkToken,
    Authorization.confirmUser,
    UserController.getProfile
  );

};

export default userRoutes;
