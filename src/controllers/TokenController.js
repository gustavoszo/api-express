import jwt from "jsonwebtoken";
import User from "../models/User";

class TokenController {
  async store(req, res) {
    const { email = "", password = "" } = req.body;

    if (!email || !password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ msg: "User not found" });

    if (!(await user.passwordIsCorrect(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return res.json({ token, user: { id, email, nome: user.nome } });
  }
}

export default new TokenController();
