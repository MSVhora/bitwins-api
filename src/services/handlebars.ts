import hbs from 'handlebars';

hbs.registerHelper('inc', function(number, options) {
   if (typeof number === 'undefined' || number === null) return null;

   // Increment by inc parameter if it exists or just by one
   return number + (options.hash.inc || 1);
});

// hbs.registerHelper('greaterThan', (v1, v2, options) => {
//    'use strict';
//    if (v1 > v2) {
//       return options.fn(this);
//    }
//    return options.inverse(this);
// });

// hbs.registerHelper('ifCond', (v1, v2, options) => {
//    if (v1 === v2) {
//       return options.fn(this);
//    }
//    return options.inverse(this);
// });

export default hbs;
