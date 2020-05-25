import { CategoriesController } from "../controllers";
const CategoriesRoute = (app) => {
  app.get("/api/v1/categories", CategoriesController.findCategories);
};

export default CategoriesRoute;
