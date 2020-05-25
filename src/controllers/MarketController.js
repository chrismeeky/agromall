/* eslint-disable no-await-in-loop */
import { Market, Categories } from "../models";
import { cloudinary } from "../config";
import { HelperMethods } from "../utils";

/**
 * Class representing the Upload controller
 * @class UploadController
 * @description Upload Controller
 */
class marketController {
  /**
   * Handles adding a new market
   * Route: POST: api/v1/upload/market
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof marketController
   */
  static async addMarket(req, res) {
    try {
      const newMarket = new Market(req.body);
      const savedNewMarket = await newMarket.save();
      if (savedNewMarket) {
        const allCategories = await Categories.find();
        if (!allCategories.length) {
          const { categories } = req.body;
          const newCategories = new Categories({ categories });
          await newCategories.save();
        } else {
          const { categories, _id } = allCategories[0];
          const mergedCategories = Array.from(
            new Set(categories.concat(req.body.categories))
          );
         await Categories.updateOne({
            _id,
            $set: { categories: mergedCategories },
          });
        }

        return HelperMethods.requestSuccessful(res, {
          success: true,
          message: "Your market has been successfully added",
          market: savedNewMarket,
        });
      }
      return HelperMethods.clientError(
        res,
        "There was a problem while creating your market"
      );
    } catch (error) {
      return HelperMethods.serverError(res, error.message);
    }
  }
  /**
   *
   * @description method that updates market's information
   * @static
   * @param {object} req HTTP Request object
   * @param {object} res HTTP Response object
   * @returns {object} HTTP Response object
   * @memberof marketController
   */
  static async updateMarket(req, res) {
    const { id } = req.body;
    try {
      const marketExists = await Market.findOne({ _id: id });

      if (marketExists) {
        const updatedMarket = await Market.updateOne(
          { _id: id },
          { $set: req.body }
        );
        if (updatedMarket) {
          const updated = await Market.findOne({ _id: id });
          return HelperMethods.requestSuccessful(
            res,
            {
              success: true,
              message: "Market information updated successfully",
              market: updated,
            },
            200
          );
        }
      }
      return HelperMethods.clientError(res, "Market not found", 404);
    } catch (error) {
      return HelperMethods.serverError(res, error.message);
    }
  }
  /**
   *
   * @description method that gets a specific market
   * @static
   * @param {object} req HTTP Request object
   * @param {object} res HTTP Response object
   * @returns {object} HTTP Response object
   * @memberof marketController
   */
  static async findAMarket(req, res) {
    const { id } = req.body;
    try {
      const market = await Market.findOne({ _id: id });
      if (market) {
        return HelperMethods.requestSuccessful(res, {
          success: true,
          message: "Market found successfully",
          market,
        });
      }
      return HelperMethods.clientError(res, "Market is no longer available");
    } catch (error) {
      HelperMethods.serverError(res, error.message);
    }
  }
  /**
   *
   * @description method that gets markets between a range
   * @static
   * @param {object} req HTTP Request object
   * @param {object} res HTTP Response object
   * @returns {object} HTTP Response object
   * @memberof marketController
   */
  static async findAllMarketInRange(req, res) {
    try {
      const market = await Market.find({})
        .skip(5 * parseInt(req.body.page))
        .limit(2);
      if (market) {
        return HelperMethods.requestSuccessful(res, {
          success: true,
          message: "Market found successfully",
          market,
        });
      }
      return HelperMethods.clientError(res, "Market is no longer available");
    } catch (error) {
      HelperMethods.serverError(res, error.message);
    }
  }
  /**
   *
   * @description method that gets all specific market
   * @static
   * @param {object} req HTTP Request object
   * @param {object} res HTTP Response object
   * @returns {object} HTTP Response object
   * @memberof marketController
   */
  static async findAllMarket(req, res) {
    try {
      const markets = await Market.find({});
      if (markets) {
        return HelperMethods.requestSuccessful(res, {
          success: true,
          message: "markets found successfully",
          markets,
        });
      }
      return HelperMethods.clientError(res, "No markets found");
    } catch (error) {
      HelperMethods.serverError(res, error.message);
    }
  }
  /**
   *
   * @description method that deletes a market
   * @static
   * @param {object} req HTTP Request object
   * @param {object} res HTTP Response object
   * @returns {object} HTTP Response object
   * @memberof marketController
   */
  static async removeMarket(req, res) {
    const { id } = req.params;
    try {
      const marketExist = await Market.findOne({ _id: id });
      if (marketExist) {
        await Market.remove({ _id: id });
        return HelperMethods.requestSuccessful(
          res,
          {
            success: true,
            message: "Market has been deleted successfully",
          },
          200
        );
      }
      return HelperMethods.clientError(res, "Market not found", 404);
    } catch (error) {
      return HelperMethods.serverError(res);
    }
  }
  /**
   * Upload a single image
   * Route: POST: api/v1/upload/one
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof marketController
   */
  static async uploadOne(req, res) {
    try {
      console.log(req.files);
      const result = await cloudinary.v2.uploader.upload(req.files.image.path);
      return HelperMethods.requestSuccessful(
        res,
        {
          success: true,
          message: "uploaded successfully",
          imageUrl: result.url,
        },
        200
      );
    } catch (error) {
      return HelperMethods.serverError(res, error.message);
    }
  }
}
export default marketController;
