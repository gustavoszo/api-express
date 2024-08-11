import { Sequelize } from 'sequelize';
import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
      const { id, nome, email } = newUser;
      res.status(201).json({ id, nome, email });
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        const errors = e.errors.map((err) => ({ field: err.path, message: err.message }));
        return res.status(400).json({ errors });
      }
      console.error(e);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });
      res.json(users);
    } catch (e) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async show(req, res) {
    if (req.params.id != req.user.id) {
      return res.status(403).json();
    }

    try {
      const user = await User.findByPk(req.params.id);
      const { id, nome, email } = user;
      res.json({ id, nome, email });
    } catch (e) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(req, res) {
    if (req.params.id != req.user.id) {
      return res.status(403).json();
    }

    try {
      let user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ msg: `user id '${req.params.id}' not found` });
      user = await user.update(req.body);
      const { id, nome, email } = user;
      res.json({ id, nome, email });
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        const errors = e.errors.map((err) => ({ field: err.path, message: err.message }));
        return res.status(400).json({ errors });
      }
      console.log(e);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.user.id);
      await user.destroy();
      res.json();
    } catch (e) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new UserController();
