import { NextFunction, Request, Response } from 'express';
import { isEmpty, isUUID } from '../../../utils/validator';
import { createValidationResponse } from '../../../utils/helper';

class TempValidator {
   /**
    * @description
    * @param req
    * @param res
    * @param next
    */
   public static add(req: Request, res: Response, next: NextFunction) {
      const { uuid } = req.body;
      const errors: any = {};

      if (isEmpty(uuid)) {
         errors.type = req.__('STATE.ADD.VALIDATIONS.uuid.required');
      } else if (!isUUID(uuid)) {
         errors.type = req.__('STATE.ADD.VALIDATIONS.uuid.mustString');
      }

      if (Object.keys(errors).length > 0) {
         createValidationResponse(res, errors);
      } else {
         next();
      }
   }

   /**
    * @description get all state list validation
    * @param req
    * @param res
    * @param next
    */
   public static getAll(req: Request, res: Response, next: NextFunction) {
      const {} = req.body;
      const errors: any = {};

      if (Object.keys(errors).length > 0) {
         createValidationResponse(res, errors);
      } else {
         next();
      }
   }
}

export default TempValidator;
