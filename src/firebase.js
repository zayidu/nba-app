import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDgwsjdWcEJ_CO3EvufPf03liv-bqSGf0s',
  authDomain: 'nba-full-stack-59c4b.firebaseapp.com',
  databaseURL: 'https://nba-full-stack-59c4b.firebaseio.com',
  projectId: 'nba-full-stack-59c4b',
  storageBucket: 'nba-full-stack-59c4b.appspot.com',
  messagingSenderId: '713493038591',
  appId: '1:713493038591:web:0365924f06907f05ea93ca',
  measurementId: 'G-DCP4EGM6DK',
};

// Initialize Firebase
firebase.initializeApp(config);
const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams = firebaseDB.ref('teams');
const firebaseVideos = firebaseDB.ref('videos');

const firebaseLooper = (snapshot) => {
  // debugger;
  const data = [];
  snapshot.forEach((childSnapshot) => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key,
    });
  });
  return data;
};

export {
  firebase,
  firebaseDB,
  firebaseArticles,
  firebaseTeams,
  firebaseVideos,
  firebaseLooper,
};
