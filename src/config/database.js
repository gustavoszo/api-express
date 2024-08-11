// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

module.exports = {
  dialect: 'mysql',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  define: {
    // timestamps: Se true, o Sequelize adicionará automaticamente os campos createdAt e updatedAt às tabelas.
    timestamps: true,
    // underscored: Se true, os nomes de colunas e tabelas no banco de dados serão em snake_case (ex: created_at em vez de createdAt).
    // underscoredAll: Similar a underscored, mas aplica-se a todos os nomes, incluindo relações.
    underscored: true,
    underscoredAll: true,
    // Para garantir
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  // dialectOptions: Configura opções específicas do dialeto do banco de dados. Aqui, define o fuso horário como America/Sao_Paulo.
  dialectOptions: {
    timezone: 'America/Sao_Paulo',
  },
  // timezone: Define o fuso horário padrão para todas as operações do Sequelize.
  timezone: 'America/Sao_Paulo',
};
