import { FindOptions, Transaction } from 'sequelize';
import { TempType, TempQueryType } from '../types';
import { TempSchema } from '../schema';
class TempModel {
   public buildQuery(object: TempQueryType): FindOptions {
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
   async addOne(insertObject: TempType, transaction: Transaction | undefined = undefined): Promise<TempType> {
      try {
         const insertedObj: TempType = await TempSchema.create(insertObject, {
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
   async getMany(condition: any = {}, attributes: any, other: object = {}): Promise<TempType[]> {
      try {
         return await TempSchema.findAll({
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
   async getSingle(condition: any = {}, attributes: any[] = [], other: object = {}): Promise<TempType | null> {
      try {
         return await TempSchema.findOne({
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
   async getSingleWithJoin(props: TempQueryType): Promise<TempType | null> {
      try {
         let findQuery: FindOptions = this.buildQuery(props);

         return await TempSchema.findOne(findQuery);
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
         await TempSchema.update(obj, {
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
         return await TempSchema.count({ where: condition, ...other });
      } catch (error) {
         throw error;
      }
   }
}

const tempModel = new TempModel();
export default tempModel;
