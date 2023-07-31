import { Request, Response, Router } from 'express';
import controller from './controller';
import authMiddleware from "../../../middlewares/authorization"

const router = Router();

/**
 * User Details
 * @route GET /user/details
 * @group GET - API for fetching user details
 * @returns {object} 200 - Ok
 * @returns {object} 422 - Un processable Entity
 * @returns {object} 500 - Internal server error
 *
 */
router.get('/details', authMiddleware.isUserAuthorized, (req: Request, res: Response) => {
   controller.details(req, res);
});

/**
 * Get Airdrop
 * @route POST /user/airdrop
 * @group POST - API for getting airdrop
 * @returns {object} 200 - Ok
 * @returns {object} 422 - Un processable Entity
 * @returns {object} 500 - Internal server error
 *
 */
router.post('/airdrop', authMiddleware.isUserAuthorized, (req: Request, res: Response) => {
   controller.airdrop(req, res);
});

export default router;
