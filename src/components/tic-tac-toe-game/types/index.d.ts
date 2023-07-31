import { FindAttributeOptions, FindOptions, WhereOptions } from 'sequelize/types'

declare namespace TicTacToeGame {
   export interface TicTacToeGameType {
      id?: number
      uuid?: string
      amount?: number
      player1Id?: number
      player2Id?: number
      player1UUID?: string
      player2UUID?: string
      isCompleted?: boolean
      wonBy?: string
      createdAt?: number
      updatedAt?: number
   }

   export interface QueryType {
      condition?: WhereOptions
      attributes?: FindAttributeOptions
      other?: FindOptions
      count?: boolean
   }
}
export = TicTacToeGame
