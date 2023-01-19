'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { IconPhoto } from '@tabler/icons';
import { TrainingFile, UploadedTrainingFile } from '@interfaces/Custommodel';
import { uploadFile, getDownloadURL } from '@context/firebase/storage';
import { updateCustommodelFirst } from '@context/firebase/firestore';
import { useAuth } from '@context/AuthUserProvider';

export interface Props {
  id: string;
  fileJob: 'training' | 'validation';
}

const proxyUploadFile = async (file: string): Promise<TrainingFile> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch('/api/openai/training-files/upload', { method: 'POST', body: formData });
  const trainingFile: TrainingFile = await response.json();
  return trainingFile;
};

export default function SternDrop({ id, fileJob }: Props) {
  const { authUser } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  ///const [pokemon, setPokemon] = useState<Pokemon>(Object);

  const onDrop = useCallback(async (receivedFiles: any) => {
    setErrorMessage('');
    if (receivedFiles.length == 1) {
    } else {
      setErrorMessage('please upload one file at a time');
      return null;
    }
    const reader = new FileReader();
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = async () => {
      // validate file format ...
      const binaryStr = reader.result;
      var enc = new TextDecoder('utf-8');
      const data = enc.decode(binaryStr as BufferSource);
      const lines = data.split(/\r?\n/);
      lines.forEach((line: string) => {
        try {
          JSON.parse(line);
        } catch (error) {
          setErrorMessage('file must be a valid JSONLine format');
          return null;
        }
      });
    };
    reader.readAsArrayBuffer(receivedFiles[0]);

    try {
      const trainingFile: TrainingFile = await proxyUploadFile(receivedFiles[0]);
      const trainingFilePath: string = await uploadFile(receivedFiles[0], authUser.uid, id, trainingFile.id);
      const trainingFileURL: string = await getDownloadURL(trainingFilePath);
      const updatedCustommodel = await updateCustommodelFirst(id, authUser.uid, trainingFile.id, trainingFile, trainingFilePath, trainingFileURL);
      console.log(updatedCustommodel);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });

  return (
    <div {...getRootProps()} className="flex flex-col h-[300px] bg-gray-100 border p-10 m-4 justify-center items-center">
      <input {...getInputProps()} />
      <div className="flex items-center text-gray-400 text-bold">
        <IconPhoto size={55} stroke={1.5} className={`${isUploading ? 'text-red-500' : 'text-gray-500 '}`} />
      </div>
      <div className="flex tems-center text-red-500 text-bold h-4">{errorMessage}</div>
    </div>
  );
}
