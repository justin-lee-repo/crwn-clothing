import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCvzSys3MYU6aHilO9RMMVeUmf6o0EmsRw",
    authDomain: "crwn-db-6b1c9.firebaseapp.com",
    databaseURL: "https://crwn-db-6b1c9.firebaseio.com",
    projectId: "crwn-db-6b1c9",
    storageBucket: "crwn-db-6b1c9.appspot.com",
    messagingSenderId: "448136348650",
    appId: "1:448136348650:web:cc1e208123cf45257f6893",
    measurementId: "G-SYEBV25EVJ"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName, 
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
