const jwt = require("jsonwebtoken");

const isAuth = async (req, resizeBy, next) => {
  const token = req.cookies.jwtToken;

  if (!token) {
    res.status(401).json({ message: "No authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Not authorized. Token valdiation failed." });
  }
};

module.exports = isAuth;
