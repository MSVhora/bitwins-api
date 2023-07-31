import { Request, Response, Router } from 'express';
import validator from './validator';
import controller from './controller';
import authMiddleware from "../../../middlewares/authorization"

const router = Router();

/**
 * Initiate Game
 * @route POST /tic-tac-toe/initiate
 * @group POST - API for initiating game
 * @returns {object} 200 - Ok
 * @returns {object} 422 - Un processable Entity
 * @returns {object} 500 - Internal server error
 *
 */
router.post('/initiate', authMiddleware.isUserAuthorized, validator.initiateGame, (req: Request, res: Response) => {
   controller.initiateGame(req, res);
});


/**
 * Transfer Winning Amount
 * @route POST /tic-tac-toe/win
 * @group POST - API for transferring winning amount
 * @returns {object} 200 - Ok
 * @returns {object} 422 - Un processable Entity
 * @returns {object} 500 - Internal server error
 *
 */
router.post('/win', authMiddleware.isTicTacToeGameBackendAuthorized, validator.transferWinningAmount, (req: Request, res: Response) => {
   controller.transferWinningAmount(req, res);
});

export default router;
