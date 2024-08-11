import multer from 'multer';
import multerConfig from '../config/multerConfig';
import Photo from '../models/Photo';

const upload = multer(multerConfig).single('photo');

class PhotoController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({ error: [error.code] });
      }

      try {
        const { originalname, filename } = req.file;
        const { id_aluno } = req.body;
        const photo = await Photo.create({ originalname, filename, id_aluno });
        const { id, url } = photo;
        return res.json({
          id, originalname, filename, id_aluno, url,
        });
      } catch (e) {
        console.log(e);
        res.status(400).json({ error: 'Aluno not exists' });
      }
    });
  }
}

export default new PhotoController();
