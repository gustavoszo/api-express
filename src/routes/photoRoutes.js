import { Router } from 'express';
import photoController from '../controllers/PhotoController';
import loginRequired from '../middlewares/loginRequired';

const route = Router();

route.post('', loginRequired, photoController.store);

export default route;
