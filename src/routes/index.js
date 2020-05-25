import authRoute from "./authRoute";
import userRoute from "./userRoute";
import marketRoute from "./marketRoute";
import categoriesRoute from "./categoriesRoute";
const routes = (app) => {
  authRoute(app);
  userRoute(app);
  marketRoute(app);
  categoriesRoute(app);
};
export default routes;
