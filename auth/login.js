const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/users");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .send({ error: "Please provide both email and password!!" });

  try {
    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(404)
        .send({ error: `User with email: ${email} not found!!` });

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches)
      return res.status(400).send({ error: "Passwords do not match" });

    const token = await jwt.sign({
      user: {
        id: user.id,
        role: user.role,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      }}, "1234", { expiresIn: "10h" }
    );
    res.send({ token }).status(200)
  } catch (error) {
    console.log({ error: error.message });
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
    login
}