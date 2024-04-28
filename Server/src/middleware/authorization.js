const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");
    
    if (!jwtToken) {
      return res.status(403).json("Not Authorize. Token not found");
    }

    const payload = jwt.verify(jwtToken, process.env.JWTSECRET);

    req.body.user = payload.user;

    next();
  } catch (error) {
    console.log(error)
    return res.status(403).json("Not Authorize");
  }
}
