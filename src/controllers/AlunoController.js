import { Sequelize } from 'sequelize';
import Aluno from '../models/Aluno';
import Photo from '../models/Photo';

class AlunoController {
  async index(req, res) {
    try {
      const alunos = await Aluno.findAll({ attributes: { exclude: ['created_at', 'updated_at'] }, include: { model: Photo, as: 'photos', attributes: ['filename', 'url'] } });
      res.json(alunos);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async store(req, res) {
    try {
      const newAluno = await Aluno.create(req.body);
      const {
        id, nome, sobrenome, email, peso, altura,
      } = newAluno;
      res.status(201).json({
        id, nome, sobrenome, email, peso, altura,
      });
    } catch (e) {
      if (e instanceof Sequelize.ValidationError) {
        const errors = e.errors.map((err) => ({ field: err.path, message: err.message }));
        return res.status(400).json({ errors });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const aluno = await Aluno.findByPk(id, { attributes: { exclude: ['created_at', 'updated_at'] }, include: { model: Photo, as: 'photos', attributes: ['filename', 'url'] } });
      if (!aluno) return res.status(404).json({ msg: `aluno id ${id} not found` });

      res.json(aluno);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const aluno = await Aluno.findByPk(id);
      if (!aluno) return res.status(404).json({ msg: `aluno id ${id} not found` });

      await aluno.update(req.body);
      const {
        nome, sobrenome, email, peso, altura,
      } = aluno;
      res.json({
        id, nome, sobrenome, email, peso, altura,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const aluno = await Aluno.findByPk(id);
      if (!aluno) return res.status(404).json({ msg: `aluno id '${id}' not found` });

      await aluno.destroy();
      res.json();
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new AlunoController();
