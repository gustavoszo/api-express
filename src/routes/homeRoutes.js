import { Router } from 'express';
import homeController from '../controllers/HomeController';

const route = Router();

route.get('', homeController.index);

export default route;
