import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../utils/dbConfig';

class User extends Model {
   public id!: number
   public uuid!: string
   public name!: string
   public email!: string
   public publicKey!: string
   public privateKey!: string
   public jsonToken!: string
   public createdAt!: number
   public updatedAt!: number
}

User.init(
   {
      id: {
         type: DataTypes.BIGINT,
         autoIncrement: true,
         primaryKey: true
      },
      uuid: {
         type: DataTypes.STRING,
         unique: true
      },
      name: {
         type: DataTypes.STRING,
         defaultValue: ''
      },
      email: {
         type: DataTypes.STRING,
         defaultValue: ''
      },
      publicKey: {
         type: DataTypes.STRING,
         defaultValue: ''
      },
      privateKey: {
         type: DataTypes.STRING,
         defaultValue: ''
      },
      jsonToken: {
         type: DataTypes.STRING,
         defaultValue: ''
      },
      createdAt: {
         type: DataTypes.BIGINT,
         defaultValue: Math.floor(Date.now() / 1000)
      },
      updatedAt: {
         type: DataTypes.BIGINT,
         defaultValue: Math.floor(Date.now() / 1000)
      }
   },
   {
      sequelize,
      tableName: 'user',
      modelName: 'user',
      timestamps: false,
      hooks: {
         beforeCreate: (rec, _opt) => {
            rec.setDataValue('createdAt', Math.floor(Date.now() / 1000));
            rec.setDataValue('updatedAt', Math.floor(Date.now() / 1000));
         },
         beforeUpdate: (rec, _opt) => {
            rec.setDataValue('updatedAt', Math.floor(Date.now() / 1000));
         }
      }
   }
);

export default User;
