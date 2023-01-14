import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";
import Consultant from "../models/consultant.js";
dotenv.config();

const isAuth = async (req, res, next) => {
  try {
    const authtoken = req.get("Authorization");
    if (!authtoken) {
      const error = new Error();
      error.message = "Not authenticated!";
      error.statusCode = 401;
      throw error;
    }
    const token = authtoken.split(" ")[1]; // Bearer
    let decodeToken;
    try {
      decodeToken = jwt.verify(token, process.env.SECRET_KEY); //veryfing is our token validate with our secret which we have in .env file
    } catch (err) {
      err.statusCode = 500;
      throw err;
    }
    if (!decodeToken) {
      const error = new Error();
      error.message = "Not authenticated!";
      error.statusCode = 401;
      throw error;
    }
    const user = await User.findOne({ _id: decodeToken.id });
    const consultant = await Consultant.findOne({ _id: decodeToken.id });
    if (consultant) {
      req.consultant = true;
    }
    req.userId = decodeToken.id; // setting req.userId with this decode token userId
    next();
  } catch (exception) {
    res.status(401).json(exception);
  }
};

export { isAuth };
