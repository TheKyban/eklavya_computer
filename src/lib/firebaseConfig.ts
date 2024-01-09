import { getApps, initializeApp } from "firebase/app";
import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
} from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
    apiKey: "AIzaSyA_RrD3tgDzafNkZl4tDsSq6ogrGGImezw",
    authDomain: "aditya-portfolio-3f38c.firebaseapp.com",
    projectId: "aditya-portfolio-3f38c",
    storageBucket: "aditya-portfolio-3f38c.appspot.com",
    messagingSenderId: "980267861638",
    appId: "1:980267861638:web:375fc5272418357206f307",
};

export const firebaseApp =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const storage = getStorage(
    firebaseApp,
    process.env.FIREBASE_STORAGE_BUCKET
);

export const UPLOAD_TO_FIREBASE = async (
    file: File,
    folder: "user" | "student"
) => {
    const imageRef = ref(storage, `${folder}/${v4()}`);
    const imageDetails = await uploadBytes(imageRef, file);
    return imageDetails.ref.fullPath;
};

export const GET_FILE_URL = async (path: string) => {
    const imageRef = ref(storage, path);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
};

export const DELETE_FILE = async (path: string) => {
    const imageRef = ref(storage, path);
    deleteObject(imageRef)
        .then(async () => {
            console.log("File Deleted");
        })
        .catch(() => {
            console.log("Something went wrong.");
        });
};
