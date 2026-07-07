const generateToken = require("./generateToken");

const authResponse = (user) => ({
  token: generateToken(user),
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
});

module.exports = authResponse;