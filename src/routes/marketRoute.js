import { MarketController } from "../controllers";
import { Authorization } from "../middlewares";

const MarketRoute = (app) => {
  app.post(
    "/api/v1/market/upload",
    Authorization.checkToken,
    Authorization.confirmRole,
    MarketController.addMarket
  );
  app.post(
    "/api/v1/upload/one",
    Authorization.checkToken,
    Authorization.confirmRole,
    MarketController.uploadOne
  );
  app.patch(
    "/api/v1/market/update",
    Authorization.checkToken,
    Authorization.confirmRole,
    MarketController.updateMarket
  );
  app.get("/api/v1/market", MarketController.findAMarket);
  app.get("/api/v1/markets", MarketController.findAllMarket);
  app.get("/api/v1/markets/range", MarketController.findAllMarketInRange);

  app.delete(
    "/api/v1/market/:id/:token",
    Authorization.checkToken,
    Authorization.confirmRole,
    MarketController.removeMarket
  );
};

export default MarketRoute;
