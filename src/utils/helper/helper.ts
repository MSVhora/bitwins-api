import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { literal } from 'sequelize';

import { HTTP_STATUS, PAGINATION } from '../constants';
import { logger } from '../logger';

/**
 * @description Create Response
 * @param {Object} res
 * @param {Number} status
 * @param {String} message
 * @param {Object} payload
 * @param {Object} pager
 */
export const createResponse = (
   res: Response,
   status: HTTP_STATUS,
   message: string,
   payload: object = {},
   pager?: object
) => {
   pager = pager !== undefined ? pager : {};
   return res.status(Number(status)).json({
      status,
      message,
      payload,
      pager: pager
   });
};

/**
 * @description Create Response
 * @param {Object} res
 * @param {Number} status
 * @param {String} message
 * @param {Object} payload
 * @param {Object} pager
 */
export const createResponseV2 = ({
   message,
   payload = {},
   res,
   status,
   pager,
   code
}: {
   res: Response;
   status: HTTP_STATUS;
   message: string;
   payload?: object;
   pager?: object;
   code?: string;
}) => {
   pager = pager !== undefined ? pager : {};
   return res.status(Number(status)).json({
      status,
      message,
      payload,
      pager: pager,
      code
   });
};

/**
 * @description Send Validation Response
 * @param {errors} errors - Errors Object
 * @param {Object} res
 */
export const createValidationResponse = async (res: Response, errors: any) => {
   // logger.error(__filename, 'validations', '', 'validation errors', errors);
   return createResponse(res, HTTP_STATUS.UNPROCESSED, errors[Object.keys(errors)[0]], {
      error: errors[Object.keys(errors)[0]]
   });
};

/**
 * decode JWT token
 * @param JWT token
 */
export const decodedJWTToken = (token: string) => {
   try {
      const tokenString = token.split(' ')[1] === undefined ? token : token.split(' ')[1];
      return jwt.decode(tokenString);
   } catch (err) {
      return false;
   }
};

/**
 * create JWT token
 * @param JWT token
 */
export const createJWTToken = (data: any) => {
   try {
      return jwt.sign(data, process.env.JWT_KEY || 'staticSecret');
   } catch (err) {
      throw err;
   }
};

/**
 * verify JWT token
 * @param JWT token
 */
export const verifyJWTToken = (token: any) => {
   try {
      return jwt.verify(token, process.env.JWT_KEY || 'staticSecret');
   } catch (err) {
      throw err;
   }
};

/**
 * It will return random value between min and max value.
 * @param {min}
 * @param {max}
 *
 * @return {number}
 */
export const getRandom = (min: number, max: number) => {
   return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * It will return sorting order either from req or from constants.
 * @param {req}
 *
 * @return {string}
 */
export const getSortOrder = (req: Request) => {
   let sortOrder = req.body.sortOrder || req.query.sortOrder;
   return sortOrder !== undefined ? sortOrder : PAGINATION.SORT_ORDER;
};

/**
 * It will return sort by column name either from req or from constants.
 * @param {req}
 *
 * @return {string}
 */
export const getSortBy = (req: Request) => {
   let sortBy = req.body.sortBy || req.query.sortBy;
   return sortBy !== undefined ? sortBy : PAGINATION.SORT_BY;
};

/**
 * It will return page number either from req or from constants.
 * @param {req}
 *
 * @return {number}
 */
export const getPageNumber = (req: Request) => {
   let pageNumber = req.body.pageNumber || req.query.pageNumber;
   return pageNumber !== undefined && !isNaN(pageNumber) && pageNumber > 0 ? pageNumber : PAGINATION.PAGE_NUMBER;
};

/**
 * It will return number of records per page count either from req or from constants.
 * @param {req}
 *
 * @return {number}
 */
export const getRecordsPerPage = (req: Request) => {
   const recordsPerPage = req.body.recordsPerPage || req.query.recordsPerPage;
   return recordsPerPage !== undefined && !isNaN(recordsPerPage) && recordsPerPage > 0
      ? recordsPerPage
      : PAGINATION.RECORDS_PER_PAGE;
};

/**
 * It will be used to generate random string of provided length from provided string
 * @param {randomString}
 * @param {length}
 *
 * @return {string}
 */
export const randomStr = (randomString: string, length: number) => {
   let randomText = '';
   for (let i = 0; i < length; i++) {
      randomText += randomString.charAt(Math.floor(Math.random() * randomString.length));
   }
   return randomText;
};

/**
 * generate random number between two number
 * @param min minimum number
 * @param max maximum number
 * @returns
 */
export const randomIntFromInterval = (min, max) => {
   // min and max included
   return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * It will be used to get keys of an object in an array
 * @param {object}
 *
 * @return {Array of string}
 */
export const getObjectKeys = (obj: object) => {
   try {
      return Object.keys(obj);
   } catch (err) {
      logger.error(__filename, 'getObjectKeys', '', 'Error in getObjectKeys', JSON.stringify(err.stack));
      throw err;
   }
};

/**
 * It will validate JWT token from req
 * @param {req object}
 */
export const validateJWTToken = (req: Request, res: Response, next: NextFunction) => {
   try {
      // find user Id from JWT Token
      const authorization = req.headers && req.headers.authorization ? req.headers.authorization : '';
      const JWTData = decodedJWTToken(authorization);
      if (JWTData) {
         next();
      } else {
         logger.error(__filename, 'validateJWTToken', 'UUID N/A', req.__('INVALID_ACCESS_TOKEN'));
         createResponse(res, HTTP_STATUS.UNPROCESSED, req.__('INVALID_ACCESS_TOKEN'));
         return;
      }
   } catch (error) {
      logger.error(__filename, 'validateJWTToken', 'UUID N/A', req.__('JWT_DECODE_ERROR'), error);
      createResponse(res, HTTP_STATUS.SERVER_ERROR, req.__('SERVER_ERROR_MESSAGE'));
      return;
   }
};

/**
 * @description Get Uniq String
 * @param string
 */
export const uniqString = (string: string) => {
   const newName: string = `${Date.now()}-${string}`;
   return newName;
};

/**
 * @description Get Date representation from Number of days
 * @param days
 */
export const getDateRepresentation = (days: number) => {
   // The string we're working with to create the representation
   var str = '';
   // Map lengths of `diff` to different time periods
   var values: any = [
      [' year', 365],
      [' month', 30],
      [' day', 1]
   ];

   // Iterate over the values...
   for (var i = 0; i < values.length; i++) {
      var amount = Math.floor(days / values[i][1]);

      // ... and find the largest time value that fits into the diff
      if (amount >= 1) {
         // If we match, add to the string ('s' is for pluralization)
         str += amount + values[i][0] + (amount > 1 ? 's' : '') + ' ';

         // and subtract from the diff
         days -= amount * values[i][1];
      }
   }
   return str;
};

/**
 * @description Get Year and month representation from Number of months
 * @param months
 */
export const getMonthRepresentation = (months: number) => {
   let totalExp = '';
   let year = Math.floor(months / 12);
   let month = months % 12;
   if (year >= 1 || month >= 1) {
      const yearText = `${Math.floor(months / 12)} ${year > 1 ? 'years ' : 'year '}`;
      const monthText = `${month} ${month > 1 ? 'months' : 'month'}`;
      year >= 1 ? (totalExp += yearText) : (totalExp += '');
      month >= 1 ? (totalExp += monthText) : (totalExp += '');
      return totalExp;
   } else {
      return 0;
   }
};

/**
 * @description Get uniq file name
 * @param string
 */
export const uniqFileName = (string: string) => {
   const newName: string = string.replace(/^([^.]*)\.(.*)$/, `$1-${Date.now()}.$2`);
   return newName;
};

/**
 * @description Get Leading Zero if single character
 * @param string
 */
const getLeadingZero = (string: string | number) => {
   return ('0' + string).slice(-2);
};

/**
 * @desc: Get UTC date
 * @param dateObj Date object or string
 */
export const getUTCDate = (dateObj: any) => {
   let date = new Date(dateObj);
   return new Date(
      Date.UTC(
         date.getFullYear(),
         date.getMonth(),
         date.getDate(),
         date.getHours(),
         date.getMinutes(),
         date.getSeconds()
      )
   );
};

/**
 * @description Convert Date object to Office date format YYYY-MM-DD
 * @param date
 */
export const convertToDateFormat = (date: Date) =>
   `${date.getFullYear()}-${getLeadingZero(date.getMonth() + 1)}-${getLeadingZero(date.getDate())}`; // Date format conversion

/**
 * @description get distance field in meter for find near by location
 * @param {Number} param0.latitude - latitude
 * @param {Number} param0.longitude - longitude
 * @param {String} param0.latField - latitude field name
 * @param {String} param0.longField - longitude field name
 */
export const getDistanceField = ({
   latitude,
   longitude,
   latField = 'latitude',
   longField = 'longitude',
   measure = 'm',
   witLiteral = true
}: {
   latitude?: number;
   longitude?: number;
   latField?: string;
   longField?: string;
   measure?: 'km' | 'm';
   witLiteral?: boolean;
}): any => {
   let measureMultiply: number = 1000;

   switch (measure) {
      case 'km':
         measureMultiply = 1;
         break;
      case 'm':
         measureMultiply = 1000;
         break;
      default:
         break;
   }

   let calcString = `${6371 * measureMultiply} * acos(
          cos(
            radians(${latitude})
          ) * cos(
            radians(${latField})
          ) * cos(
            radians(${longField}) - radians(${longitude})
          ) + sin(
            radians(${latitude})
          ) * sin(
            radians(${latField})
          )
        )`;

   if (witLiteral) {
      return literal(calcString);
   }

   return calcString;
};

/**
 * Method to check array contain duplicate value or not
 * @param arr array
 * @param value value to find duplicate
 * @returns boolean
 */
export const hasDuplicates = (arr, value: any = '') => {
   let seen = new Set();
   value = value.split('.');

   return arr.some(function(v) {
      return (
         seen.size ===
         seen.add(
            value.length > 0
               ? value.reduce((acc, next) => {
                    return next ? acc[next] : acc;
                 }, v)
               : v
         ).size
      );
   });
};

export const parseBooleanValue = (str: string): boolean => {
   let parseObj = {
      true: true,
      false: false,
      '': false,
      0: false,
      1: true
   };
   return parseObj[str] || false;
};

export const sequelizeGetJsonObjUpdateField = ({ key, value, field }) => {
   return literal(`jsonb_set(cast(${field} as jsonb), '{${key}}', '"${value}"', true)`);
};

/**
 * Method to get key by value
 * @param object
 * @param value
 * @returns
 */
export const getKeyByValue = (object, value) => {
   return Object.keys(object).find((key) => object[key] === value);
};

/**
 * Method to get pincode from address
 * @param object
 * @param value
 * @returns
 */
export const getPincodeFromAddress = ({ values }: { values: string[] }) => {
   let result;

   values.every((value) => {
      if (!value) return true;

      result = value.match(/[1-9][0-9]{5}/);

      if (result) return false;

      return true;
   });

   if (!result) return null;

   return result[0];
};
