const asyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  console.log("abc 1");
  let token;
  let authHeaer = req.headers.Authorization || req.headers.authorization;
  if (authHeaer && authHeaer.startsWith("Bearer")) {
    console.log("abc 2");
    token = authHeaer.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
      console.log("abc 3");
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      console.log("abc 4");

      console.log(decoded);
      req.user = decoded.user;
      console.log("abc 5");
      next();
    });
    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
  }
});

module.exports = validateToken;
