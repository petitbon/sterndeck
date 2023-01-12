const functions = require('firebase-admin');
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

export const FunctionsShared = {
  firestore: () => admin.firestore(),
};
