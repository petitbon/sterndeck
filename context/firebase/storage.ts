import { deleteObject, getDownloadURL as getStorageDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { firebaseStorage } from './firebase';

const BUCKET_URL = 'fine-tuned-files';

export async function uploadFile(file: any, uid: string, custommodelid: string, fileid: string) {
  const filePath = `${BUCKET_URL}/${uid}/${custommodelid}/${fileid}.jsonl`;
  const uploadedFile = await uploadBytes(ref(firebaseStorage, filePath), file);
  return uploadedFile.metadata.fullPath;
}

// Replaces existing image in storage and returns the storage bucket
export function replaceImage(image: any, bucket: any) {
  uploadBytes(ref(firebaseStorage, bucket), image);
}

// Deletes existing image in storage
export function deleteFile(path: any) {
  //  console.log('path', path);
  // console.log('firebaseStorage', firebaseStorage);

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
