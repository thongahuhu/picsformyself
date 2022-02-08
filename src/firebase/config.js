import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: 'pics4urself-7b237.firebaseapp.com',
  databaseURL:
    'https://pics4urself-7b237-default-rtdb.asia-southeast1.firebasedatabase.app/',
  projectId: 'pics4urself-7b237',
  storageBucket: 'pics4urself-7b237.appspot.com',
  messagingSenderId: '606823122591',
  appId: '1:606823122591:web:0edc0912b8b26a24f7c4aa',
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const db = getDatabase(app)
