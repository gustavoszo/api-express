import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

// O sequelize utiliza o validator. Tudo que tem em validator, tem disponivel aqui.

export default class User extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'O campo nome deve ter entra 3 e 255 caracteres',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email já existe',
        },
        validate: {
          isEmail: {
            msg: 'E-mail inválido',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'A senha deve ter entre 6 e 50 caracteres',
          },
        },
      },
    }, {
      sequelize,
      // tableName: 'users', // Explicitamente define o nome da tabela
    });

    // Os hooks no Sequelize são funções que podem ser executadas em determinados momentos do ciclo de vida do modelo. O hook beforeSave é executado antes de um modelo ser salvo no banco de dados (ou seja, antes de uma operação de INSERT ou UPDATE).
    // addHook é um método do Sequelize que permite adicionar hooks a modelos.
    // this refere-se à classe User. No contexto de métodos estáticos em JavaScript, this faz referência à própria classe, não a uma instância dela.
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });
  }

  // Verificar se a senha do usuário está correta de acordo com o usuário
  passwordIsCorrect(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
