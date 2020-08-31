const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
  // Get token from then header
  const token = req.header("y-auth-token");

  // Check in not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, jwtSecret);

    req.admin = decoded.admin;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
