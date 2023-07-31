import { Request, Response, Router } from 'express';
import validator from './validator';
import controller from './controller';

const router = Router();

/**
 * Login User
 * @route POST /auth/login
 * @group Post - API for authenticating user
 * @returns {object} 200 - Ok
 * @returns {object} 422 - Un processable Entity
 * @returns {object} 500 - Internal server error
 *
 */
router.post('/login', validator.login, (req: Request, res: Response) => {
   controller.login(req, res);
});

export default router;
