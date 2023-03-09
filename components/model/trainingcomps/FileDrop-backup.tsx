'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ITrainingFile } from '@interfaces/ITrainingFile';

import { uploadStorageFile, getDownloadURL } from '@cloudstorage/storage';
import { addTrainingFile } from '@firestore/trainingFiles';

export interface Props {
  user_uid: string;
  model_id: string;
}

const sendFileToOpenai = async (file: string): Promise<ITrainingFile> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch('/api/openai/training-files/upload', { method: 'POST', body: formData });
  const trainingFile: ITrainingFile = await response.json();
  return trainingFile;
};

export default function FileDrop({ user_uid, model_id }: Props) {
  const [error, setError] = useState<string>('');

  const onDrop = useCallback(async (receivedFiles: any) => {
    console.log(receivedFiles);
    setError('');
    if (receivedFiles.length !== 1) {
      setError('please upload one file at a time');
      return null;
    }
    const reader = new FileReader();
    reader.onabort = () => setError('File reading was aborted.');
    reader.onerror = () => setError('file reading has failed');
    reader.onload = async () => {
      const binaryStr = reader.result;
      var enc = new TextDecoder('utf-8');
      const data = enc.decode(binaryStr as BufferSource);
      const clean = data.split('\n').filter(Boolean).join('\n');
      const lines = clean.split('\n');
      lines.forEach((line: string) => {
        try {
          JSON.parse(line);
        } catch (error) {
          console.log('bad line', JSON.stringify(line));
          setError('File must be a valid CSV');
          return null;
        }
      });
    };
    reader.readAsArrayBuffer(receivedFiles[0]);
    try {
      const openaifile: ITrainingFile = await sendFileToOpenai(receivedFiles[0]);
      const trainingFilePath: string = await uploadStorageFile(receivedFiles[0], user_uid, model_id, openaifile.id);
      const trainingFileURL: string = await getDownloadURL(trainingFilePath);
      const tf = { ...openaifile, path: trainingFilePath, url: trainingFileURL };
      await addTrainingFile(user_uid, model_id, tf);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });

  return (
    <div className="">
      <label className="custom-label">Training File ( JSONLine format )</label>
      <div {...getRootProps()} className="flex flex-col h-[100px] bg-gray-100 border items-center justify-center">
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          <div className={!!error ? 'text-error' : ''}>{!!error ? error : 'Drag and drop CSV file.'} </div>
        </div>
      </div>
    </div>
  );
}
