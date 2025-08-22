const jwt= require("jsonwebtoken");

function generateToken(payload) {
  return jwt.sign(
    {
      userId: payload._id,
      role: payload.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}

module.exports = generateToken;