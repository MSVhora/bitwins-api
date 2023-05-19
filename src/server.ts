import { createServer } from 'http';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../.env') });

import app from './app';
import { logger } from './utils/logger';
import sequelize from './utils/dbConfig';
import migration from './scripts/202112231529-migrate-update-store-webpage';

const server = createServer(app);
const port: number = Number(process.env.PORT) || 3000;

// first connect database then
(async () => {
   try {
      await sequelize.authenticate();
      logger.info(__filename, '', '', `DB Connection has been established successfully`, ``);

      // migration();

      server.listen(port, () => {
         logger.info(__filename, '', '', `Server is running on ${port}`, ``);
      });

      // Cron job functions
   } catch (e) {
      logger.error(__filename, '', '', `Unable to connect to the server`, e);
      // await sequelize.close();
      process.exit(1);
   }
})();
