export class HTTP_STATUS {
   public static readonly SUCCESS = 200;
   public static readonly UNAUTHORIZED = 401;
   public static readonly UNPROCESSED = 422;
   public static readonly SERVER_ERROR = 500;
   public static readonly NOT_FOUND = 404;
} // list of required HTTP Statuses

export class PAGINATION {
   public static readonly SORT_BY = 'createdAt';
   public static readonly SORT_ORDER = 'DESC';
   public static readonly PAGE_NUMBER = 1;
   public static readonly SKIP = 0;
   public static readonly TAKE = 10;
   public static readonly RECORDS_PER_PAGE = 10;
}

export const JOB_APPLICATION_MIME_TYPE: string[] = [
   'application/pdf',
   'application/x-pdf',
   'application/msword',
   'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
   'image/png',
   'image/jpeg',
   'image/pjpeg',
   'image/jpeg',
   'image/pjpeg'
];

export const BASE_PATH: string = __dirname + '/../../'; //path till the project directory

export const ROUTE_PREFIX_V1: string = '/api/v1';
export const ROUTE_PREFIX_V2: string = '/api/v2';

// Reg ex list
export const REGEXP = {
   PASSWORD_REGEXP: /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z])(.{8,}))$/,
   ALPHA_NUMERIC_REGEXP: /^[A-Za-z0-9 ]*$/,
   ALPHABETS_REGEXP: /^[A-Za-z ]*$/,
   EMAIL_ADDRESS_REGEXP: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
   URL: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
   DATE_FORMAT: /^\d{4}-\d{1,2}-\d{1,2}$/,
   DATE_TIME_FORMAT: /^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01]) (00|0[1-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])$/
};

/**
 * Create custom HTTP Error code for multiple enterprise feature when providerUUID is not found in request
 */
export const CUSTOM_STATUS_CODES = {
   PROVIDER_UUID_NOT_FOUND: 425
};

export const WEEK_DAY = {
   SUNDAY: 0,
   MONDAY: 1,
   TUESDAY: 2,
   WEDNESDAY: 3,
   THURSDAY: 4,
   FRIDAY: 5,
   SATURDAY: 6
};

export const WEEK_DAY_INDEX = {
   [WEEK_DAY.MONDAY]: 0,
   [WEEK_DAY.TUESDAY]: 1,
   [WEEK_DAY.WEDNESDAY]: 2,
   [WEEK_DAY.THURSDAY]: 3,
   [WEEK_DAY.FRIDAY]: 4,
   [WEEK_DAY.SATURDAY]: 5,
   [WEEK_DAY.SUNDAY]: 6
};

export const TIMEZONE = 'Asia/Kolkata';
