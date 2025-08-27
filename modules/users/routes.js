import { Router } from 'express';
import { createUser, getUser } from './controller.js';

const router = new Router();

router.post('/', createUser);
router.get('/:id', getUser);

export default router;
