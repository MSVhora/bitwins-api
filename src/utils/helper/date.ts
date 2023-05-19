import moment from 'moment';
import { logger } from '../logger';

export const dateSetStartOfDay = function(date: moment.Moment): moment.Moment {
   try {
      return date.set({
         hour: 0,
         minute: 0,
         second: 0,
         millisecond: 0
      });
   } catch (error) {
      logger.error(__filename, 'dateSetStartOfDay', '', `moment set start of day hour function error`, error);
      throw error;
   }
};

/** Method for generate random date between two date */
export const generateRandomDate = function({ start, end }: { start: Date; end: Date }): Date {
   return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};
