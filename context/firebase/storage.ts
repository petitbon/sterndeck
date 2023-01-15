import { format } from 'date-fns';
import { deleteObject, getDownloadURL as getStorageDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { firebaseStorage } from './firebase';

// Bucket URL from Storage in Firebase Console
const BUCKET_URL = '';

// Uploads image and returns the storage bucket
export async function uploadImage(image: any, uid: string) {
  const formattedDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
  const bucket = `${BUCKET_URL}/${uid}/${formattedDate}.jpg`;
  await uploadBytes(ref(firebaseStorage, bucket), image);
  return bucket;
}

// Replaces existing image in storage and returns the storage bucket
export function replaceImage(image: any, bucket: any) {
  uploadBytes(ref(firebaseStorage, bucket), image);
}

// Deletes existing image in storage
export function deleteImage(bucket: any) {
  deleteObject(ref(firebaseStorage, bucket));
}

// Gets the download URL from the reference URL
export async function getDownloadURL(bucket: any) {
  return await getStorageDownloadURL(ref(firebaseStorage, bucket));
}
