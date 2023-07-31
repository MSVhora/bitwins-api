import { Request, Response } from 'express';
import { createResponse } from '../../../utils/helper';
import { logger } from '../../../utils/logger';
import STATUS_CODES from 'http-status-codes';
import { UserModel } from '../../user/model';
import { isEmpty } from '../../../utils/validator';
import { SolanaHelper } from '../../../services/solana';

class UserController {
    /**
     * @description
     * @param req
     * @param res
     */
    public static async details(req: Request, res: Response) {
        try {
            const user = await UserModel.getSingle({ id: req.user.id })

            if (isEmpty(user)) {
                // User not found
                createResponse(res, STATUS_CODES.BAD_REQUEST, req.__('USER.AIRDROP.ERROR'))
                return
            }

            // Fetch Token Balance
            req.user.tokenAmount = (await SolanaHelper.getBalance(user?.privateKey!)).toString()

            createResponse(res, STATUS_CODES.OK, req.__('USER.DETAILS.SUCCESS'), req.user);
        } catch (e) {
            logger.error(__filename, 'User Details', '', `details function error`, e);
            createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, req.__('SERVER_ERROR_MESSAGE'));
        }
    }

    public static async airdrop(req: Request, res: Response) {
        try {
            const user = await UserModel.getSingle({ id: req.user.id })

            if (isEmpty(user)) {
                // User not found
                createResponse(res, STATUS_CODES.BAD_REQUEST, req.__('USER.AIRDROP.ERROR'))
                return
            }

            await SolanaHelper.transferToken(user?.privateKey!, 100, false)
            createResponse(res, STATUS_CODES.OK, req.__('USER.AIRDROP.SUCCESS'));
        } catch (e) {
            logger.error(__filename, 'User Airdrop', '', `airdrop function error`, e);
            createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, req.__('SERVER_ERROR_MESSAGE'));
        }
    }
}

export default UserController;
