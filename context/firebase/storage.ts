import { deleteObject, getDownloadURL as getStorageDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { firebaseStorage } from './firebase';

// Bucket URL from Storage in Firebase Console
const BUCKET_URL = 'fine-tuned-files';

// Uploads file and returns the uploaded file
export async function uploadFile(file: any, uid: string, id: string, setUploadedFile: any, setIsUploading: any) {
  setIsUploading(true);
  const filePath = `${BUCKET_URL}/${uid}/${id}.jsonl`;
  await uploadBytes(ref(firebaseStorage, filePath), file).then((out) => {
    getDownloadURL(out.metadata.fullPath).then((url) => {
      setUploadedFile({ path: out.metadata.fullPath, URL: url });
    });
    setIsUploading(false);
  });
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
