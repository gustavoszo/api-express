import { Router } from 'express';
import alunoController from '../controllers/AlunoController';
import loginRequired from '../middlewares/loginRequired';

const route = Router();

route.get('', alunoController.index);
route.post('', loginRequired, alunoController.store);
route.get('/:id', alunoController.show);
route.put('/:id', loginRequired, alunoController.update);
route.delete('/:id', loginRequired, alunoController.delete);

export default route;
