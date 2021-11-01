const admin = require('firebase-admin')
require('dotenv').config();

admin.initializeApp({
    credential: admin.credential.cert({
      "project_id": process.env.FIREBASE_PROJECT_ID,
      "private_key": process.env.FIREBASE_PRIVATE_KEY,
      "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: ""
});

exports.verifyLogin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    // no token, unauthenticated
    if (!token) return res.sendStatus(401);
    // has token, verify token  
    admin.auth().verifyIdToken(token)
        .then(() => {
            next()
        }).catch(() => {
            res.status(403).send('Unauthorized')
        });
    }
  