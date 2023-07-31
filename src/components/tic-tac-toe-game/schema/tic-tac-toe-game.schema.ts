import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../utils/dbConfig';

class TicTacToeGame extends Model {
   public id!: number
   public uuid!: string
   public amount!: number
   public player1Id!: number
   public player2Id?: number
   public player1UUID!: string
   public player2UUID?: string
   public isCompleted?: boolean
   public wonBy?: string
   public createdAt!: number
   public updatedAt!: number
}

TicTacToeGame.init(
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
      amount: {
         type: DataTypes.DOUBLE,
      },
      player1Id: {
         type: DataTypes.BIGINT,
      },
      player2Id: {
         type: DataTypes.BIGINT,
      },
      player1UUID: {
         type: DataTypes.STRING,
      },
      player2UUID: {
         type: DataTypes.STRING,
      },
      isCompleted: {
         type: DataTypes.BOOLEAN,
         defaultValue: false
      },
      wonBy: {
         type: DataTypes.STRING,
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
      tableName: 'tic_tac_toe_game',
      modelName: 'tic_tac_toe_game',
      timestamps: false,
      indexes: [
         {
            fields: ['amount', 'player2UUID']
         }
      ],
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

export default TicTacToeGame;
