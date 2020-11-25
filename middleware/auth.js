import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData;
    if (token && token.length < 500) {
      decodedData = jwt.verify(token, process.env.SECRET);
      if (decodedData) {
        req.userId = decodedData.id;
      }
    } else {
      decodedData = jwt.decode(token);
      if (decodedData) {
        req.userId = decodedData.sub;
      }
    }
    next();
  } catch (err) {
    console.log(err);
  }
};

export default auth;
