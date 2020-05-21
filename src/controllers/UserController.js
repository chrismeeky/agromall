import { User } from "../models";
import { Authentication, HelperMethods, CryptData } from "../utils";

/**
 * Class representing the user controller
 * @class UserController
 * @description users controller
 */
class UserController {
  /**
   * Login a user
   * Route: POST: /auth/login
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof UserController
   */
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const userFound = await User.findOne({ email });
      if (!userFound) {
        return HelperMethods.clientError(
          res,
          "Email or password does not exist",
          400
        );
      }

      const isPasswordValid = await CryptData.decryptData(
        password,
        userFound.password
      );
      if (userFound && isPasswordValid) {
        const tokenCreated = await Authentication.getToken({
          id: userFound.id,
          username: userFound.username,
          role: userFound.role,
        });
        if (tokenCreated) {
          const userDetails = {
            id: userFound.id,
            username: userFound.username,
            role: userFound.role,
            token: tokenCreated,
          };
          return HelperMethods.requestSuccessful(
            res,
            {
              success: true,
              message: "Login successful",
              userDetails,
            },
            200
          );
        }
        return HelperMethods.serverError(res);
      }
      return HelperMethods.clientError(
        res,
        "Email or password does not exist",
        400
      );
    } catch (error) {
      return HelperMethods.serverError(res);
    }
  }

  /**
   * Sign up a user
   * Route: POST: /auth/signup
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof UserController
   */
  static async signUp(req, res) {
    const { email, password } = req.body;
    try {
      const userExist = await User.findOne({ email });
      if (userExist) {
        return HelperMethods.requestSuccessful(
          res,
          {
            message:
              "You are a registered user on " +
              "this platform. Please proceed to login",
          },
          200
        );
      }

      req.body.password = await CryptData.encryptData(password);
      const user = new User(req.body);
      user.role = "admin";
      const userCreated = await user.save();
      if (userCreated) {
        return HelperMethods.requestSuccessful(
          res,
          {
            success: true,
            message: "Sign up successful. Kindly proceed to log in",
          },
          200
        );
      }
      return HelperMethods.serverError(
        res,
        "Your registration could not be completed." + "Please try again"
      );
    } catch (error) {
      return HelperMethods.serverError(res);
    }
  }

  /**
   *
   * @description method that updates user's profile
   * @static
   * @param {object} req HTTP Request object
   * @param {object} res HTTP Response object
   * @returns {object} HTTP Response object
   * @memberof ProfileController
   */
  static async updateProfile(req, res) {
    try {
      const userExist = await User.findOne({ _id: req.decoded.id });
      if (userExist) {
        await User.updateOne({ _id: req.decoded.id }, { $set: req.body });
        const user = await User.findById(req.decoded.id);
        const { email, name, id, date, role } = user;
        return HelperMethods.requestSuccessful(
          res,
          {
            success: true,
            message: "profile updated successfully",
            userData: {
              email,
              name,
              id,
              date,
              role,
            },
          },
          200
        );
      }
      return HelperMethods.clientError(res, "User does not exist", 404);
    } catch (error) {
      return HelperMethods.serverError(res);
    }
  }

  /**
   *
   * @description method that gets current user's settings
   * @static
   * @param {object} req client request
   * @param {object} res server response
   * @returns {object} server response object
   * @memberof ProfileController
   */
  static async getProfile(req, res) {
    try {
      const user = await User.findOne({ _id: req.body.id });
      if (user) {
        return HelperMethods.requestSuccessful(
          res,
          {
            success: true,
            userDetails: user,
          },
          200
        );
      }
      return HelperMethods.clientError(res, "User not found", 404);
    } catch (error) {
      return HelperMethods.serverError(res);
    }
  }
}

export default UserController;
