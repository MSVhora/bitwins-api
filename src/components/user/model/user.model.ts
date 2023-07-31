import { FindOptions, Transaction } from 'sequelize';
import { UserType, QueryType } from '../types';
import { UserSchema } from '../schema';
class UserModel {
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
   async addOne(insertObject: any, transaction: Transaction | undefined = undefined): Promise<UserType> {
      try {
         const insertedObj: UserType = await UserSchema.create(insertObject, {
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
   async getMany(condition: any = {}, attributes: any, other: object = {}): Promise<UserType[]> {
      try {
         return await UserSchema.findAll({
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
   async getSingle(condition: any = {}, attributes: any[] = [], other: object = {}): Promise<UserType | null> {
      try {
         return await UserSchema.findOne({
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
   async getSingleWithJoin(props: QueryType): Promise<UserType | null> {
      try {
         let findQuery: FindOptions = this.buildQuery(props);

         return await UserSchema.findOne(findQuery);
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
         await UserSchema.update(obj, {
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
         return await UserSchema.count({ where: condition, ...other });
      } catch (error) {
         throw error;
      }
   }
}

const userModel = new UserModel();
export default userModel;
