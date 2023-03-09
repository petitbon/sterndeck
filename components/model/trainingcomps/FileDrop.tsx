'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Spin from '@components/shared/Spin';

export interface Props {
  user_uid: string;
  model_id: string;
}

export default function FileDrop({ user_uid, model_id }: Props) {
  const [error, setError] = useState<string>('');
  const [spin, setSpin] = useState(false);

  const onDrop = useCallback((acceptedFiles: any) => {
    setError('');
    const file = acceptedFiles[0];
    if (file) {
      console.log('acceptedfiles:', acceptedFiles);
      setSpin(true);
    } else {
      console.log('file was not accepted');
      setError('File was not accepted. upload one CSV file at a time.');
      setSpin(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'text/csv': ['.csv'],
    },
  });
  return (
    <div className="text-sm">
      <label className="custom-label">Training File CSV (promt,completion)</label>
      <div {...getRootProps()} className="flex flex-col h-[100px] bg-gray-100 border items-center justify-center">
        <input {...getInputProps()} />
        {spin ? (
          <div className="flex justify-center">
            <Spin size="text-4xl" />
          </div>
        ) : (
          <div>{isDragActive ? <p>Drop the file here.</p> : <p>Drag 'n' drop CSV file here, or click to select a file.</p>}</div>
        )}
      </div>
      <div className="flex flex-col items-center text-orange-600 pt-4"> {error}</div>{' '}
    </div>
  );
}
