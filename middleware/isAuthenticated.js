const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const token = req.headers["authorization"];
  console.log(token);
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  jwt.verify(token, "shahreen", (err, decoded) => {
    if (err) {
      return res.status(401).send("Unauthorized");
    }
    req.userId = decoded.userId;
    next();
  });
};

module.exports = isAuthenticated;
