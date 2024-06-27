import { Router } from 'express'; 

import { CreateUserController } from './controllers/user/CreateUserControlle';
import { AuthUserControlle } from './controllers/user/AuthUserControlle';

const router = Router();

// USER
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserControlle().handle)

export { router };