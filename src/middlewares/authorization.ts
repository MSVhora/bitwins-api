import { NextFunction } from 'express';
import STATUS_CODES from 'http-status-codes';
import { createResponse, verifyJWTToken } from '../utils/helper';
import { logger } from '../utils/logger';
import firebaseAdmin from '../utils/firebaseConfig';
import { CustomRequest, CustomResponse } from '../environment';
import CustomError from '../utils/customError';

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

         try {
            const decoded: any = await verifyJWTToken(authorization);
            // const response: UserType | null = await UserModel.getSingle({ uuid: decoded.uuid });
            // if (!response) {
            //    return createResponse(res, STATUS_CODES.UNAUTHORIZED, `Unauthorized access`);
            // } else {
            //    req.user = response;
            return next();
            // }
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
