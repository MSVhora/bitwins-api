import { Sequelize } from 'sequelize';

const DB_HOST: any = process.env.DB_HOST_POSTGRES;
const DB_NAME: any = process.env.DB_NAME_POSTGRES;
const DB_USER: any = process.env.DB_USER_POSTGRES;
const DB_PASSWORD: any = process.env.DB_PASSWORD_POSTGRES;
const DB_PORT: any = process.env.DB_PORT_POSTGRES;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
   host: DB_HOST,
   port: DB_PORT,
   dialect: 'postgres',
   pool: {
      max: 11,
      min: 0,
      acquire: 60000,
      idle: 60000
   },
   logging: false,
   define: {
      underscored: false,
      paranoid: true
   }
});

export default sequelize;
