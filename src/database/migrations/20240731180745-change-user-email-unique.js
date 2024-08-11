/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'alunos', // tabela
      'email', // coluna
      { type: Sequelize.STRING, allowNull: false, unique: true },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'alunos', // tabela
      'email', // coluna
      { type: Sequelize.STRING, allowNull: true, unique: false },
    );
  },
};
