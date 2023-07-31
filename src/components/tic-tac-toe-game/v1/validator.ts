import { NextFunction, Request, Response } from 'express';
import { isEmpty, isNumber, isString, isUUID } from '../../../utils/validator';
import { createValidationResponse } from '../../../utils/helper';

class GameValidator {
   /**
    * @description
    * @param req
    * @param res
    * @param next
    */
   public static initiateGame(req: Request, res: Response, next: NextFunction) {
      const { amount } = req.body;
      const errors: any = {};

      if (isEmpty(amount)) {
         errors.type = req.__('TIC_TAC_TOE_GAME.INITIATE_GAME.VALIDATIONS.amount.required');
      } else if (!isNumber(amount)) {
         errors.type = req.__('TIC_TAC_TOE_GAME.INITIATE_GAME.VALIDATIONS.amount.mustNumber');
      }

      if (Object.keys(errors).length > 0) {
         createValidationResponse(res, errors);
      } else {
         next();
      }
   }

   public static transferWinningAmount(req: Request, res: Response, next: NextFunction) {
      const { userId, gameId } = req.body;
      const errors: any = {};

      if (isEmpty(userId)) {
         errors.type = req.__('TIC_TAC_TOE_GAME.TRANSFER_WINNING_AMOUNT.VALIDATIONS.userId.required');
      } else if (!isString(userId)) {
         errors.type = req.__('TIC_TAC_TOE_GAME.TRANSFER_WINNING_AMOUNT.VALIDATIONS.userId.mustString');
      }

      if (isEmpty(gameId)) {
         errors.type = req.__('TIC_TAC_TOE_GAME.TRANSFER_WINNING_AMOUNT.VALIDATIONS.gameId.required');
      } else if (!isUUID(gameId)) {
         errors.type = req.__('TIC_TAC_TOE_GAME.TRANSFER_WINNING_AMOUNT.VALIDATIONS.gameId.mustUUID');
      }

      if (Object.keys(errors).length > 0) {
         createValidationResponse(res, errors);
      } else {
         next();
      }
   }
}

export default GameValidator;