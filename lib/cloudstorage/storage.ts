import { firebaseStorage } from '@context/firebase/firebase';

import { deleteObject, getDownloadURL as getStorageDownloadURL, ref, uploadBytes } from 'firebase/storage';

const BUCKET_URL = 'fine-tuned-files';

export async function uploadFile(file: any, user_uid: string, model_id: string, file_id: string) {
  const filePath = `${BUCKET_URL}/${user_uid}/${model_id}/${file_id}.jsonl`;
  const uploadedFile = await uploadBytes(ref(firebaseStorage, filePath), file);
  return uploadedFile.metadata.fullPath;
}

// Replaces existing image in storage and returns the storage bucket
export function replaceImage(image: any, bucket: any) {
  uploadBytes(ref(firebaseStorage, bucket), image);
}

// Deletes existing image in storage
export function deleteFile(path: any) {
  const desertRef = ref(firebaseStorage, path);
  deleteObject(desertRef)
    .then(() => {
      //    console.log('good'); // File deleted successfully
    })
    .catch((error) => {
      console.log('file was not removed', error);
    });
}

// Gets the download URL from the reference URL
export async function getDownloadURL(path: any) {
  return await getStorageDownloadURL(ref(firebaseStorage, path));
}
