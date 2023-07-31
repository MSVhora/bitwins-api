import { NextFunction } from 'express';
import STATUS_CODES from 'http-status-codes';
import { createResponse, verifyJWTToken } from '../utils/helper';
import { logger } from '../utils/logger';
import { UserType } from '../components/user/types';
import { UserModel } from '../components/user/model';

class Authorization {
   /**
    * @description Route Authorization for User
    * @param {Object} req
    * @param {Object} res
    * @param {Object} next
    */
   async isUserAuthorized(req: any, res: any, next: NextFunction) {
      try {
         const { authorization }: any = req.headers;
         if (!authorization) {
            return createResponse(res, STATUS_CODES.UNPROCESSABLE_ENTITY, 'Authorization Token is required.');
         }
         const authorizationSplit = authorization.split(" ")

         try {
            const decoded: any = verifyJWTToken(authorizationSplit[1]);
            const response: UserType | null = await UserModel.getSingle({ id: decoded.id }, [
               'id', 'uuid', 'name', 'email', 'jsonToken', 'createdAt', 'updatedAt', 'publicKey'
            ]);
            if (!response) {
               return createResponse(res, STATUS_CODES.UNAUTHORIZED, `Unauthorized access`);
            } else {
               req.user = response;
               return next();
            }
         } catch (error) {
            return createResponse(res, STATUS_CODES.UNAUTHORIZED, req.__('INVALID_ACCESS_TOKEN'));
         }
      } catch (e) {
         logger.error(__filename, 'isUserAuthorized', '', 'status Check error', e); // Log
         return createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, `Server Error`);
      }
   }


   /**
    * @description Route Authorization for Game Backend
    * @param {Object} req
    * @param {Object} res
    * @param {Object} next
    */
   async isTicTacToeGameBackendAuthorized(req: any, res: any, next: NextFunction) {
      try {
         const { authorization }: any = req.headers;
         if (!authorization) {
            return createResponse(res, STATUS_CODES.UNPROCESSABLE_ENTITY, 'Authorization Token is required.');
         }
         const authorizationSplit = authorization.split(" ")

         try {
            if (authorizationSplit[1] === process.env.TIC_TAC_TOE_GAME_BACKEND_TOKEN!.toString()) {
               return next();
            } else {
               return createResponse(res, STATUS_CODES.UNAUTHORIZED, `Unauthorized access`);
            }
         } catch (error) {
            return createResponse(res, STATUS_CODES.UNAUTHORIZED, req.__('INVALID_ACCESS_TOKEN'));
         }
      } catch (e) {
         logger.error(__filename, 'isUserAuthorized', '', 'status Check error', e); // Log
         return createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, `Server Error`);
      }
   }
}

const middlewareObj = new Authorization();
export default middlewareObj;
