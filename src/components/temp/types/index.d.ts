import { FindAttributeOptions, FindOptions, WhereOptions } from 'sequelize/types';

declare namespace Temp {
   export interface TempType {
      id?: number;
      uuid?: string;
      countryId?: string;
      name?: string;
      createdAt?: number;
      updatedAt?: number;
   }
   export interface TempQueryType {
      condition?: WhereOptions;
      attributes?: FindAttributeOptions;
      other?: FindOptions;
      count?: boolean;
   }
}
export = Temp;
