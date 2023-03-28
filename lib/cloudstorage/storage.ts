import { firebaseStorage } from '@context/firebase/firebase';
import { getDownloadURL as getStorageDownloadURL, ref } from 'firebase/storage';

export async function getFileURL(path: any) {
  return await getStorageDownloadURL(ref(firebaseStorage, path));
}
