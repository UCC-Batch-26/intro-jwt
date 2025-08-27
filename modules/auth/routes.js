import { Router } from 'express';
import { canEdit, login, onlyAdmin, resetPassword } from './controller.js';
import { authenticate, authorizeAdmin } from './middleware.js';

const router = new Router();

router.post('/login', authenticate, login);
router.post('/admin', authenticate, authorizeAdmin, onlyAdmin);
router.post('/edit', authenticate, canEdit);
router.post('/password', resetPassword);

export default router;
