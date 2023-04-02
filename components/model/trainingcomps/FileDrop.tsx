'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Loading from '@components/shared/Loading';
import { User } from 'firebase/auth';

export interface Props {
  user: User;
  model_id: string;
  use_case_id: string;
}

export default function FileDrop({ user, model_id, use_case_id }: Props) {
  const [error, setError] = useState<string>('');
  const [spin, setSpin] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: any) => {
    setError('');
    const file = acceptedFiles[0];
    if (file) {
      setSpin(true);
      const formData = new FormData();
      formData.append('upload', file);
      formData.append('model_id', model_id);
      formData.append('user_uid', user.uid);
      formData.append('use_case_id', use_case_id);
      formData.append('file_id', 'og.csv');

      const token = await user.getIdToken(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/upload`, {
          method: 'POST',
          body: formData,
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          setError('An error occurred while uploading the file. Please try again.');
        }
      } catch (error) {
        console.error('Error during file upload:', error);
        setError('An error occurred while uploading the file. Please try again.');
      } finally {
        setSpin(false);
      }
    } else {
      setError('File was not accepted. Upload one CSV file at a time.');
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
      <div {...getRootProps()} className="flex flex-col h-[200px] bg-gray-100 border items-center justify-center">
        <input {...getInputProps()} />
        {spin ? (
          <div className="flex justify-center">
            <Loading size="text-4xl" />
          </div>
        ) : (
          <div>{isDragActive ? <p>Drop the file here.</p> : <p>Drag 'n' drop CSV file here, or click to select a file.</p>}</div>
        )}
      </div>
      <div className="flex flex-col items-center text-orange-600 pt-4"> {error}</div>{' '}
    </div>
  );
}
