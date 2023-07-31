import { NextFunction, Request, Response } from 'express';
import { isEmpty, isString } from '../../../utils/validator';
import { createValidationResponse } from '../../../utils/helper';

class AuthValidator {
   /**
    * @description
    * @param req
    * @param res
    * @param next
    */
   public static login(req: Request, res: Response, next: NextFunction) {
      const { id, name, email } = req.body;
      const errors: any = {};

      if (isEmpty(id)) {
         errors.type = req.__('USER.ADD.VALIDATIONS.id.required');
      } else if (!isString(id)) {
         errors.type = req.__('USER.ADD.VALIDATIONS.id.mustString');
      }
      
      if(isEmpty(name)) {
         req.body.name = ""
      }

      if(isEmpty(email)) {
         req.body.email = ""
      }

      if (Object.keys(errors).length > 0) {
         createValidationResponse(res, errors);
      } else {
         next();
      }
   }
}

export default AuthValidator;
