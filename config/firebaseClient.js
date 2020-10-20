import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/app'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
}

if (typeof window !== 'undefined' && firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase
