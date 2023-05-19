import isJSON from 'validator/lib/isJSON';

/**
 * @description Check if constiable is undefined or not
 * @param {*} str
 */
export const isEmpty = (value: any) => {
   if (
      value === undefined ||
      value === null ||
      (typeof value === 'object' && Object.keys(value).length === 0) ||
      (typeof value === 'string' && value.trim().length === 0)
   ) {
      return true;
   } else {
      return false;
   }
};

/**
 * @description Check if String and doesn't contain space and special chracters
 * @param {String} str
 */
export const isValidString = (str: string) => {
   const regExp = /^[a-zA-Z]+$/;
   if (typeof str !== 'string') {
      return false;
   } else if (!str.match(regExp)) {
      return false;
   } else {
      return true;
   }
};

/**
 * @description Custom RegEx
 * @param {String} str
 * @param {String} regEx
 */
export const customRegex = (str: string, regEx: RegExp) => {
   if (typeof str !== 'string') {
      return false;
   } else if (!regEx.test(str)) {
      return false;
   } else {
      return true;
   }
};

/**
 * @desc Checks for valid email
 * @param {String} value // Accepts string
 */
export const isEmail = (value: string) => {
   const email = value;
   const myRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   const isValid = myRegEx.test(email);
   if (isValid) {
      return true;
   } else {
      return false;
   }
};

/**
 * @desc Checks for valid array
 * @param {*} value
 */
export const isArray = (value: any) => {
   if (typeof value === 'string') {
      const replaced = value.replace(/'/g, '"');
      if (!isJSON(replaced)) {
         return false;
      } else {
         const parsed = JSON.parse(replaced);
         if (parsed.constructor === Array) {
            return true;
         } else {
            return false;
         }
      }
   } else {
      if (value.constructor === Array) {
         return true;
      } else {
         return false;
      }
   }
};

/**
 * @description Is Valid Date
 * @param {*} d
 */
export const isValidDate = (d: any) => {
   if (Object.prototype.toString.call(d) === '[object Date]') {
      if (isNaN(d.getTime())) {
         return false;
      } else {
         return true;
      }
   } else {
      return false;
   }
};

/**
 * @description Check if valid string
 * @param {String} value
 */
export const isString = (value: string | object) => {
   return typeof value === 'string' || value instanceof String;
};

/**
 * @desc Checks if given value is Decimal Number
 * @param {*} value // Accepts string
 */
export const isDecimalNumber = (value: any) => {
   const number = value;
   const myRegEx = /^\d+(\.\d+)?$/;
   const isValid = myRegEx.test(number);
   if (isValid) {
      return true;
   } else {
      return false;
   }
};

/**
 * @desc Checks if given value is Number
 * @param {*} value // Accepts string
 */
export const isNumber = (value: any) => {
   const number = value;
   const myRegEx = /^(\s*[0-9]+\s*)+$/;
   const isValid = myRegEx.test(number);
   if (isValid) {
      return true;
   } else {
      return false;
   }
};

/**
 * @desc Checks if given value is float Number
 * @param {*} value // Accepts string
 */
export const isFloatNumber = (value: any) => {
   const number = value;
   const myRegEx = /^-?\d*(\.\d+)?$/;
   const isValid = myRegEx.test(number);
   if (isValid) {
      return true;
   } else {
      return false;
   }
};

/**
 * @desc Checks if given value is Boolean
 * @param {*} value // Accepts string
 */
export const isBoolean = (value: any) => {
   if (typeof value === 'boolean') {
      return true;
   } else {
      return false;
   }
};

/**
 * @desc Checks if given value is Aplha Numeric
 * @param {*} value // Accepts string
 */
export const isAlphaNumeric = (value: any) => {
   const string = value;
   const myRegEx = /^[a-z0-9 ]+$/i;
   const isValid = myRegEx.test(string);
   if (isValid) {
      return true;
   } else {
      return false;
   }
};
export const isUUID = (value: string) => {
   const regExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
   const isValid = regExp.test(value);
   if (isValid) {
      return true;
   } else {
      return false;
   }
};

export const isURL = (str: string): boolean => {
   // let pattern = new RegExp(
   //   '^(https?:\\/\\/)?' + // protocol
   //   '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
   //   '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
   //   '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
   //   '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
   //     '(\\#[-a-z\\d_]*)?$',
   //   'i'
   // ); // fragment locator
   let pattern = new RegExp('^(http|https)://', 'i');
   return pattern.test(str);
};

export const isValidConstant = (obj: any, value: any) => {
   if (Object.values(obj).indexOf(value) > -1) {
      return true;
   } else {
      return false;
   }
};

export const isObject = (obj: any) => {
   return obj instanceof Object;
};

export const isLatLong = (value: string) => {
   const regExp = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/;
   const isValid = regExp.test(value);
   if (isValid) {
      return true;
   } else {
      return false;
   }
};

export const isValidTime = (time: string) => {
   const isValid = new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$', 'gm').test(time);
   if (isValid) {
      return true;
   } else {
      return false;
   }
};

export const isValidPincode = (pincode: string) => {
   const isValid = new RegExp('^[1-9][0-9]{5}$', 'gm').test(pincode);
   if (isValid) {
      return true;
   } else {
      return false;
   }
};
