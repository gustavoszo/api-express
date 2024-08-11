import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ msg: 'Login required' });
  }

  // authorization = Bearer token
  const token = authorization.split(' ')[1];
  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);

    // Caso o usuário atualize o email durante o uso do Token
    const user = await User.findOne({ where: { email: data.email, id: data.id } });
    if (!user) {
      return res.status(401).json({ error: 'Token inválido ou expirado' });
    }

    req.user = data;
    return next();
  } catch (e) {
    res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};
