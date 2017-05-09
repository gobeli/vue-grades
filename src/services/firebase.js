import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBDdJGt_gN7HQ_x-hmm5P3mH35vOEkHU-M',
  authDomain: 'noteapp-a9d06.firebaseapp.com',
  databaseURL: 'https://noteapp-a9d06.firebaseio.com',
  projectId: 'noteapp-a9d06',
  storageBucket: 'noteapp-a9d06.appspot.com',
  messagingSenderId: '969690445978'
};

export default firebase.initializeApp(config);

export const operations = {
  set (fbase, pathFunc, data) {
    const user = fbase.auth().currentUser;
    if (user) {
      return firebase.database().ref(pathFunc(user.uid)).set(data);
    }
  },
  push (fbase, pathFunc, data) {
    const user = fbase.auth().currentUser;
    if (user) {
      return firebase.database().ref(pathFunc(user.uid)).push(data);
    }
  },
  remove (fbase, pathFunc) {
    const user = fbase.auth().currentUser;
    if (user) {
      return firebase.database().ref(pathFunc(user.uid)).remove();
    }
  }
}
