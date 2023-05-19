import { Request, Response } from 'express';
import { createResponse } from '../../../utils/helper';
import { logger } from '../../../utils/logger';
import { v4 } from 'uuid';
import STATUS_CODES from 'http-status-codes';
import { TempModel } from '../model';

class StateController {
   /**
    * @description
    * @param req
    * @param res
    */
   public static async add(req: Request, res: Response) {
      try {
         let newState = await TempModel.addOne({
            uuid: v4()
         });
         if (newState == null) {
            newState = {};
         }
         createResponse(res, STATUS_CODES.OK, req.__('TEMP.ADD.SUCCESS'), newState);
      } catch (e) {
         logger.error(__filename, 'Add temp', '', `add temp function error`, e);
         createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, req.__('SERVER_ERROR_MESSAGE'));
      }
   }

   /**
    * @description Get All state list
    * @param req
    * @param res
    */
   public static async getAll(req: Request, res: Response) {
      try {
         const { limit = 10, offset = 0 } = req.query;

         let posts = await TempModel.getMany({}, undefined, {
            order: [['createdAt', 'ASC']],
            limit: limit,
            offset: offset
         });

         createResponse(res, STATUS_CODES.OK, req.__('TEMP.GET_ALL.SUCCESS'), posts);
      } catch (e) {
         logger.error(__filename, 'Get All temp List', '', `get all temp list function error`, e);
         createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, req.__('SERVER_ERROR_MESSAGE'));
      }
   }
}

export default StateController;
