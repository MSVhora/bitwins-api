import { Request, Response } from 'express';
import { createJWTToken, createResponse } from '../../../utils/helper';
import { logger } from '../../../utils/logger';
import STATUS_CODES from 'http-status-codes';
import { UserModel } from '../../user/model';
import { isEmpty } from '../../../utils/validator';
import { SolanaHelper } from '../../../services/solana';
import { UserType } from 'components/user/types';

class AuthController {
   /**
    * @description
    * @param req
    * @param res
    */
   public static async login(req: Request, res: Response) {
      try {
         const { id, name, email } = req.body

         // Check if id already exists
         let user = await UserModel.getSingle({
            uuid: id
         })

         if (isEmpty(user)) {
            // User does not exists create new user
            const keyPair = await SolanaHelper.createTokenAccount()
            const userData: UserType = {
               uuid: id,
               name: name,
               email: email,
               publicKey: keyPair.publicKey.toBase58(),
               privateKey: keyPair.secretKey.toString()
            }
            user = await UserModel.addOne(userData)
         }


         const loginToken = createJWTToken({
            uuid: user?.uuid,
            id: user?.id
         });

         await UserModel.update({ jsonToken: loginToken }, { id: user?.id })

         const response = {
            token: loginToken
         }

         createResponse(res, STATUS_CODES.OK, req.__('USER.LOGIN.SUCCESS'), response);
      } catch (e) {
         logger.error(__filename, 'Login User', '', `login function error`, e);
         createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, req.__('SERVER_ERROR_MESSAGE'));
      }
   }
}

export default AuthController;
