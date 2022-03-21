import jwt from "jsonwebtoken";
import dotenv from "dotenv";
//Auth middleware: check if the user has the access rights to do the specific action
//next: if the request passes the tests in the middleware, then we go to the "NEXT" action
const authMiddleware = async (req, res, next) => {
  dotenv.config();

  try {
    //check if the token is valid
    const token = req.headers.authorization.split(" ")[1];

    //if the token length is greater then 500, then it is a google token
    const isCustomAuth = token.length < 500;

    //get the data from the custom token
    let decodedData;

    if (token && isCustomAuth) {
      //get the data from each specific token (username, id)
      decodedData = jwt.verify(token, process.env.SECRET);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      //sub= is googles name for id to differentiate every single user
      req.userId = decodedData?.sub;
    }
    //call next to pass to the next action
    next();
  } catch (error) {
    console.log(error);
  }
};

export default authMiddleware;
