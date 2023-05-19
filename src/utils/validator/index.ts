import isJSON from 'validator/lib/isJSON';
import isLength from 'validator/lib/isLength';
import isInt from 'validator/lib/isInt';
import matches from 'validator/lib/matches';
import isNumeric from 'validator/lib/isNumeric';
import isIn from 'validator/lib/isIn';

// Custom Validators
import {
   isEmpty,
   isValidString,
   customRegex,
   isEmail,
   isArray,
   isDecimalNumber,
   isNumber,
   isBoolean,
   isAlphaNumeric,
   isString,
   isValidDate,
   isUUID,
   isURL,
   isFloatNumber,
   isValidConstant,
   isObject,
   isLatLong,
   isValidPincode
} from './custom-validator';

export {
   // Validations
   isJSON,
   isLength,
   isInt,
   matches,
   isNumeric,
   isIn,
   isURL,
   // Custom Validations
   isEmpty,
   isValidString,
   customRegex,
   isEmail,
   isArray,
   isDecimalNumber,
   isNumber,
   isBoolean,
   isAlphaNumeric,
   isString,
   isValidDate,
   isUUID,
   isFloatNumber,
   isValidConstant,
   isObject,
   isLatLong,
   isValidPincode
};
