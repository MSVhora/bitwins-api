import { Request, Response, Router } from 'express';
import validator from './validator';
import controller from './controller';

const router = Router();

/**
 * Add new state
 * @route POST /state/api/v1/add
 * @group Post - API related to adding new state
 * @returns {object} 200 - Ok
 * @returns {object} 422 - Un processable Entity
 * @returns {object} 500 - Internal server error
 *
 */
router.post('/add', validator.add, (req: Request, res: Response) => {
   controller.add(req, res);
});

/**
 * Get all state list
 * @route GET /state/api/v1/all
 * @group GET - API related to retrieving all state
 * @returns {object} 200 - Ok
 * @returns {object} 422 - Un processable Entity
 * @returns {object} 500 - Internal server error
 *
 */
router.get('/all', validator.getAll, (req: Request, res: Response) => {
   controller.getAll(req, res);
});

export default router;
