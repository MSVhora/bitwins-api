import * as nodeSchedule from 'node-schedule';
import { logger } from '../utils/logger';

class NodeSchedule {
   public static async schedule(name, rule, callback) {
      logger.debug(__filename, 'schedule', '', `Job scheduled with name ${name}`);
      let job = nodeSchedule.scheduleJob(name, rule, callback);
      return job;
   }

   public static async cancel(name) {
      logger.debug(__filename, 'cancel', '', `Job cancelled with name ${name}`);
      nodeSchedule.cancelJob(name);
   }
}

export default NodeSchedule;
