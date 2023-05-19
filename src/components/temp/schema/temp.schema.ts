import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../utils/dbConfig';

class Temp extends Model {
   public id!: number;
   public uuid!: string;
   public createdAt!: number;
   public updatedAt!: number;
}

Temp.init(
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
      tableName: 'temp',
      modelName: 'temp',
      timestamps: false,
      hooks: {
         beforeCreate: (rec, opt) => {
            rec.setDataValue('createdAt', Math.floor(Date.now() / 1000));
            rec.setDataValue('updatedAt', Math.floor(Date.now() / 1000));
         },
         beforeUpdate: (rec, opt) => {
            rec.setDataValue('updatedAt', Math.floor(Date.now() / 1000));
         }
      }
   }
);

export default Temp;
