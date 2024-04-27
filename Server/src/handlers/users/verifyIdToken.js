const authorization = require("../../middleware/authorization.js");
const verifyIdTokenController = require("../../controllers/user/verifyIdToken.js")

async function verifyIdTokenHandler(req, res) {
  try {
    const response = await verifyIdTokenController.verifyIdToken(req.body.user);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

  
module.exports = verifyIdTokenHandler;