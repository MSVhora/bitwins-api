import { logger } from '../utils/logger';
import firebaseAdmin from '../utils/firebaseConfig';

class fcmNotification {
   constructor() {}

   public async sendNotification(data: any, registrationToken: any, options: any = {}) {
      logger.info(__filename, 'sendNotification', '', 'fcm send notification function call');
      return new Promise((resolve, reject) => {
         // check if registrationToken is an array or not
         if (Array.isArray(registrationToken)) {
            const pageSize = 500;
            /** send notification */
            const rec = (page) => {
               let deviceTokens = registrationToken.slice((page - 1) * pageSize, page * pageSize);
               if (deviceTokens.length > 0) {
                  let token: any = {
                     tokens: deviceTokens
                  };

                  let obj: any = {
                     ...data,
                     ...token,
                     android: {
                        priority: 'high',
                        notification: {
                           imageUrl: options.image
                        }
                     },
                     apns: {
                        fcm_options: {
                           image: options.image
                        }
                     }
                  }; // merge object
                  // send notifications to multple devices
                  firebaseAdmin
                     .messaging()
                     .sendMulticast(obj)
                     .then((response) => {
                        resolve(response);
                     })
                     .catch((e) => {
                        logger.error(__filename, 'notification', page, `Push notification sending function error`, e);
                        reject(new Error('Could not send notification'));
                     });
                  rec(++page);
               }
            };
            rec(1);
         } else {
            let token: any = {
               token: registrationToken
            };
            let obj: any = {
               ...data,
               ...token,
               android: {
                  priority: 'high',
                  notification: {
                     imageUrl: options.image
                  }
               },
               apns: {
                  fcm_options: {
                     image: options.image
                  }
               }
            }; // merge object
            firebaseAdmin
               .messaging()
               .send(obj)
               .then((response) => {
                  resolve(response);
               })
               .catch((e) => {
                  logger.error(__filename, 'notification', '0', `Push notification sending function error`, e);
                  reject(new Error('Could not send notification'));
               });
         }
      });
   }

   public async sendNotificationV2({
      data,
      registrationToken,
      options = {},
      appType = 'customer'
   }: {
      data: any;
      registrationToken: any;
      options?: any;
      appType?: 'customer' | 'partner';
   }) {
      let firebaseAdminType: any = {
         customer: firebaseAdmin
      };

      logger.info(__filename, 'sendNotification', '', 'fcm send notification function call');
      return new Promise((resolve, reject) => {
         // check if registrationToken is an array or not
         if (Array.isArray(registrationToken)) {
            const pageSize = 500;
            /** send notification */
            const rec = (page) => {
               let deviceTokens = registrationToken.slice((page - 1) * pageSize, page * pageSize);
               if (deviceTokens.length > 0) {
                  let token: any = {
                     tokens: deviceTokens
                  };

                  let obj: any = {
                     ...data,
                     ...token,
                     android: {
                        priority: 'high',
                        notification: {
                           imageUrl: options.image
                        }
                     },
                     apns: {
                        fcm_options: {
                           image: options.image
                        }
                     }
                  }; // merge object
                  // send notifications to multple devices
                  firebaseAdminType[appType]
                     .messaging()
                     .sendMulticast(obj)
                     .then((response) => {
                        resolve(response);
                     })
                     .catch((e) => {
                        logger.error(__filename, 'notification', page, `Push notification sending function error`, e);
                        reject(new Error('Could not send notification'));
                     });
                  rec(++page);
               }
            };
            rec(1);
         } else {
            let token: any = {
               token: registrationToken
            };
            let obj: any = {
               ...data,
               ...token,
               android: {
                  priority: 'high',
                  notification: {
                     imageUrl: options.image
                  }
               },
               apns: {
                  fcm_options: {
                     image: options.image
                  }
               }
            }; // merge object
            firebaseAdminType[appType]
               .messaging()
               .send(obj)
               .then((response) => {
                  resolve(response);
               })
               .catch((e) => {
                  logger.error(__filename, 'notification', '0', `Push notification sending function error`, e);
                  reject(new Error('Could not send notification'));
               });
         }
      });
   }
}

export default new fcmNotification();
