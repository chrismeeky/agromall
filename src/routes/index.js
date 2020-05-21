import authRoute from "./authRoute";
import userRoute from "./userRoute";
import marketRoute from "./marketRoute";
const routes = (app) => {
  authRoute(app);
  userRoute(app);
  marketRoute(app);
};
export default routes;
