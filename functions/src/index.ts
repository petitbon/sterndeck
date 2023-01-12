const functions = require('firebase-admin');

import { FunctionsShared } from './FunctionsShared';

export const addUser = functions.auth.user().onCreate((user: any) => {
  return FunctionsShared.firestore()
    .collection('users')
    .doc(user.uid)
    .set(JSON.parse(JSON.stringify(user)));
});

/*

import * as functions from 'firebase-functions';

const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

export const createUserDocument = functions.auth.user().onCreate((user) => {
  db.collection('users')
    .doc(user.uid)
    .set(JSON.parse(JSON.stringify(user)));
});
 */
