import { firebaseStorage } from '@context/firebase/firebase';

import { getBlob, getStorage, deleteObject, getDownloadURL as getStorageDownloadURL, ref, uploadBytes } from 'firebase/storage';

const BUCKET_URL = 'fine-tuned-files';

export async function uploadStorageFile(file: any, user_uid: string, model_id: string, file_id: string) {
  const filePath = `${BUCKET_URL}/${user_uid}/${model_id}/${file_id}.jsonl`;
  const uploadedFile = await uploadBytes(ref(firebaseStorage, filePath), file);
  return uploadedFile.metadata.fullPath;
}

// Deletes existing image in storage
export function deleteStorageFile(path: any) {
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
export async function getFileURL(path: any) {
  return await getStorageDownloadURL(ref(firebaseStorage, path));
}

export async function getSignedURL(path: string) {
  // Create a reference with an initial file path and name
  const storage = getStorage();
  // const pathReference = ref(storage, path);

  // Create a reference from a Google Cloud Storage URI
  //  const gsReference = ref(storage, 'gs://bucket/images/stars.jpg');

  // Create a reference from an HTTPS URL
  // Note that in the URL, characters are URL escaped!
  const httpsReference = ref(storage, path);

  console.log(httpsReference);
  return httpsReference;
}
