import app from './app';

const port = 3001;
app.listen(port, () => {
  console.log(`Executando na porta ${port}`);
  console.log(`Acesse em: http://localhost:${port}`);
});
