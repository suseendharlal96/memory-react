import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedData = jwt.verify(token, process.env.SECRET);
    if (decodedData) {
      req.userId = decodedData.id;
    }
    next();
  } catch (err) {   
    console.log(err);
  }
};

export default auth;
