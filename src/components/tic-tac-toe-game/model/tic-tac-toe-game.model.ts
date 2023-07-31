import { FindOptions, Transaction } from 'sequelize';
import { TicTacToeGameType, QueryType } from '../types';
import { TicTacToeGameSchema } from '../schema';
class TicTacToeGameModel {
   public buildQuery(object: QueryType): FindOptions {
      let findQuery: FindOptions = {
         attributes: object.attributes,
         where: object.condition,
         ...object.other,
         include: []
      };
      return findQuery;
   }

   /**
    * @description
    * @param insertObject
    * @param transaction
    */
   async addOne(insertObject: any, transaction: Transaction | undefined = undefined): Promise<TicTacToeGameType> {
      try {
         const insertedObj: TicTacToeGameType = await TicTacToeGameSchema.create(insertObject, {
            transaction: transaction ? transaction : undefined
         });
         return insertedObj;
      } catch (error) {
         throw error;
      }
   }

   /**
    * @description
    * @param condition
    * @param attributes
    * @param others
    */
   async getMany(condition: any = {}, attributes: any, other: object = {}): Promise<TicTacToeGameType[]> {
      try {
         return await TicTacToeGameSchema.findAll({
            include: [],
            attributes: attributes !== undefined ? attributes : undefined,
            where: condition,
            ...other
         });
      } catch (e) {
         throw e;
      }
   }

   /**
    * @description
    * @param condition
    * @param attributes
    * @param others
    */
   async getSingle(condition: any = {}, attributes: any[] = [], other: object = {}): Promise<TicTacToeGameType | null> {
      try {
         return await TicTacToeGameSchema.findOne({
            attributes: attributes.length > 0 ? attributes : undefined,
            where: condition,
            raw: true,
            ...other
         });
      } catch (e) {
         throw e;
      }
   }

   /**
    * @description
    * @param condition
    * @param attributes
    * @param others
    */
   async getSingleWithJoin(props: QueryType): Promise<TicTacToeGameType | null> {
      try {
         let findQuery: FindOptions = this.buildQuery(props);

         return await TicTacToeGameSchema.findOne(findQuery);
      } catch (e) {
         throw e;
      }
   }

   /**
    * @description
    * @param {Object} obj update object
    * @param {Object} condition
    * @param {Object} transaction
    */
   async update(obj: object, condition: any, transaction: Transaction | undefined = undefined) {
      try {
         await TicTacToeGameSchema.update(obj, {
            where: condition,
            transaction: transaction ? transaction : undefined
         });
         return;
      } catch (e) {
         throw e;
      }
   }

   /**
    * @description
    * @param condition
    * @param others
    */
   async count(condition: any = {}, other: object = {}): Promise<any> {
      try {
         return await TicTacToeGameSchema.count({ where: condition, ...other });
      } catch (error) {
         throw error;
      }
   }
}

const gameModel = new TicTacToeGameModel();
export default gameModel;
