import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// Check if the admin is authenticated

const checkAuthAdmin = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Gets the jwt and separate the word Barer

      token = req.headers.authorization.split(" ")[1];
      // Decodes the token

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // This finds the user by the id decoded and add it to the request
      // The "select" function allows don't pass some information that it's not requiered
      req.admin = await Admin.findById(decoded.id).select(
        "-password -createdAt -updatedAt -__v"
      );
      return next();
    } catch (error) {
      console.log(error)
      return res.status(404).json({
        msg: "Hubo un error",
      });
    }
  }

  if (!token) {
    const error = new Error("Token no válido");
    return res.status(401).json({
      msg: error.message,
    });
  }

  next();
};

export default checkAuthAdmin;
