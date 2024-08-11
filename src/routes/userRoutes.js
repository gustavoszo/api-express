import { Router } from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const route = Router();

route.get('', userController.index);
route.post('', userController.store);
route.get('/:id', loginRequired, userController.show);
route.put('/:id', loginRequired, userController.update);
route.delete('/', loginRequired, userController.delete);

export default route;
