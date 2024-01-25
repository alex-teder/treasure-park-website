import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCnA3g1wN2B5LvxSSK-SXFM6Ns172WhA20",
  authDomain: "treasure-park-website.firebaseapp.com",
  projectId: "treasure-park-website",
  storageBucket: "treasure-park-website.appspot.com",
  messagingSenderId: "533962516255",
  appId: "1:533962516255:web:594131733fbb13aefe722a",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const avatarsRef = ref(storage, "avatars");
export const attachmentsRef = ref(storage, "attachments");
