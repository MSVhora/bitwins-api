import * as admin from 'firebase-admin';

admin.initializeApp({
   credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CONFIG || '{}')),
   databaseURL: 'Firebase-Database-URL'
});

export default admin;
