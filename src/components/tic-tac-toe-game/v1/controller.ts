import { Request, Response } from 'express';
import { logger } from '../../../utils/logger';
import STATUS_CODES from 'http-status-codes';
import { UserModel } from '../../user/model';
import { isEmpty } from '../../../utils/validator';
import { SolanaHelper } from '../../../services/solana';
import { createResponse } from '../../../utils/helper';
import { TicTacToeGameModel } from '../model';
import { TicTacToeGameType } from '../types';
import { v4 } from 'uuid';
import TicTacToeHelper from '../helper'
import sequelize from '../../../utils/dbConfig/db.config';

class TicTacToeGameController {
    public static async initiateGame(req: Request, res: Response) {
        const transaction = await sequelize.transaction()
        try {
            const { amount } = req.body

            // Check if user exists
            const user = await UserModel.getSingle({ id: req.user.id })
            if (isEmpty(user)) {
                // User not found
                createResponse(res, STATUS_CODES.BAD_REQUEST, req.__('TIC_TAC_TOE_GAME.INITIATE_GAME.USER_NOT_FOUND'))
                return
            }

            // check if any game room is available
            let gameRoom = await TicTacToeGameModel.getSingle({ amount: amount, player2UUID: null })

            if (isEmpty(gameRoom)) {
                // no rooms available create one
                const newGameRoom: TicTacToeGameType = {
                    uuid: v4(),
                    player1Id: user?.id,
                    player1UUID: user?.uuid,
                    amount: amount,
                    isCompleted: false,
                }
                gameRoom = await TicTacToeGameModel.addOne(newGameRoom, transaction)
            } else {
                // add user to existing room
                const updateRoom: TicTacToeGameType = {
                    player2Id: user?.id,
                    player2UUID: user?.uuid,
                }
                await TicTacToeGameModel.update(updateRoom, { id: gameRoom?.id }, transaction)

                const player1 = await UserModel.getSingle({ id: gameRoom?.player1Id })

                // pay player1 fee
                await SolanaHelper.transferToken(player1?.privateKey!, amount)

                // pay player2 fee
                await SolanaHelper.transferToken(user?.privateKey!, amount)

                // create tic tac toe socket game room
                await TicTacToeHelper.createRoom(player1?.uuid!, player1?.name!, user?.uuid!, user?.name!, gameRoom?.uuid!)
            }

            await transaction.commit()
            createResponse(res, STATUS_CODES.OK, req.__('TIC_TAC_TOE_GAME.INITIATE_GAME.SUCCESS'), gameRoom!);
        } catch (e) {
            await transaction.rollback()
            logger.error(__filename, 'Game PAY_GAME_FEE', '', `initiateGame function error`, e);
            createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, req.__('SERVER_ERROR_MESSAGE'));
        }
    }

    public static async transferWinningAmount(req: Request, res: Response) {
        try {
            const { gameId, userId } = req.body
            const user = await UserModel.getSingle({ uuid: userId })
            const game = await TicTacToeGameModel.getSingle({ uuid: gameId, isCompleted: false })


            if (isEmpty(game)) {
                // User not found
                createResponse(res, STATUS_CODES.BAD_REQUEST, req.__('TIC_TAC_TOE_GAME.TRANSFER_WINNING_AMOUNT.ERROR.GAME_NOT_FOUND'))
                return
            }

            if (isEmpty(user)) {
                // User not found
                createResponse(res, STATUS_CODES.BAD_REQUEST, req.__('TIC_TAC_TOE_GAME.TRANSFER_WINNING_AMOUNT.ERROR.USER_NOT_FOUND'))
                return
            }

            await TicTacToeGameModel.update({
                wonBy: userId,
                isCompleted: true,
            }, { id: game!.id })

            const amount = isEmpty(game?.amount) ? 0 : game!.amount!
            const winningAmount = amount * 1.8
            await SolanaHelper.transferToken(user?.privateKey!, winningAmount, false)
            createResponse(res, STATUS_CODES.OK, req.__('TIC_TAC_TOE_GAME.TRANSFER_WINNING_AMOUNT.SUCCESS'));
        } catch (e) {
            logger.error(__filename, 'Game TRANSFER_WINNING_AMOUNT', '', `transferWinningAmount function error`, e);
            createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, req.__('SERVER_ERROR_MESSAGE'));
        }
    }
}

export default TicTacToeGameController;
