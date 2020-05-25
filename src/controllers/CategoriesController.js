/* eslint-disable no-await-in-loop */
import { Categories } from "../models";
import { HelperMethods } from "../utils";

/**
 * Class representing the Upload controller
 * @class UploadController
 * @description Upload Controller
 */
class categoriesController {
  /**
   *
   * @description method that gets all markets
   * @static
   * @param {object} req HTTP Request object
   * @param {object} res HTTP Response object
   * @returns {object} HTTP Response object
   * @memberof categoriesController
   */
  static async findCategories(req, res) {
    try {
      const categories = await Categories.find({});
      if (categories) {
        return HelperMethods.requestSuccessful(res, {
          success: true,
          message: "categories found successfully",
          categories: categories[0].categories,
        });
      }
      return HelperMethods.clientError(res, "No categories found");
    } catch (error) {
      HelperMethods.serverError(res, error.message);
    }
  }
}
export default categoriesController;
