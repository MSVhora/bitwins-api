import { FindAttributeOptions, FindOptions, WhereOptions } from 'sequelize/types'

declare namespace User {
   export interface UserType {
      id?: number
      uuid?: string
      name?: string
      email?: string
      publicKey?: string
      privateKey?: string
      jsonToken?: string
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
export = User
