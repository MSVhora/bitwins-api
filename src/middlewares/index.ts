import bodyParser from 'body-parser';
import compression from 'compression';
import { Application, NextFunction, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import { logger } from '../utils/logger';
import { logger as reqResLogger } from '../utils/reqResLogger';
import { i18n } from './i18n';
import uuid from './uuid';
import cors from 'cors';

export default (app: Application) => {
   app.use(compression());
   app.use(bodyParser.json()); // Use body parser
   app.use(bodyParser.urlencoded({ limit: '500mb', extended: true })); // url encode with bodyParser
   app.use(i18n.init); // support internationalization
   app.use(fileUpload());
   app.use(cors());
   app.set('view engine', 'hbs');

   function logResponseBody(req, res, next) {
      let oldWrite = res.write,
         oldEnd = res.end;

      let chunks: any = [],
         body: any;

      res.write = function(chunk) {
         chunks.push(chunk);

         return oldWrite.apply(res, arguments);
      };

      res.end = function(chunk) {
         if (chunk) chunks.push(chunk);

         body = Buffer.concat(chunks).toString('utf8');

         oldEnd.apply(res, arguments);

         // if (!req.path.match(/delivery/gi)) {
         if (process.env['RES_LOG'] == 'true') {
            reqResLogger.debug(
               __filename,
               'logResponseBody',
               `${req.baseUrl}${req.path}`,
               req.method,
               `${JSON.stringify(req.body)} - ${JSON.stringify(req.query)} - ${res.statusCode}${body}`
            );
         }
         logger.debug(
            __filename,
            'logResponseBody',
            `${req.baseUrl}${req.path}`,
            req.method,
            `${JSON.stringify(req.body)} - ${JSON.stringify(req.query)} - ${res.statusCode}${
               res.statusCode != 200 ? ` -  ${body}` : ''
            }`
         );
         // }
      };

      next();
      return;
   }

   app.use(logResponseBody);

   /**
    * Passport middleware init
    */
   /**
    * Passport Strategy
    */

   app.use(underMaintenanceCheck); // check to see if app is under maintenance
   uuid(app); // add uuid in req if not available
   // add all other middleware here
};

let underMaintenanceCheck = (req: Request, res: Response, next: NextFunction) => {
   if (process.env.APP_UNDER_MAINTAINANCE === 'true') {
      logger.info(__filename, '', '', req.__('SERVICE_UNAVAILABLE'));
      res.status(503).json({
         status: 503,
         message: req.__('SERVICE_UNAVAILABLE')
      });
      return;
   } else {
      next();
   }
};
