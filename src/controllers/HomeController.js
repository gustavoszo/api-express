class HomeController {
  async index(req, res) {
    res.send('Home');
  }
}

export default new HomeController();
