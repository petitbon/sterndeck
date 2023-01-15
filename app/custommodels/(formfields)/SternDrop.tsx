'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function SternDrop() {
  const formData = new FormData();

  const [isLoading, setIsLoading] = React.useState(false);

  const onDrop = useCallback((acceptedFiles: any) => {
    setIsLoading(true);
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = async () => {
        // Do whatever you want with the file contents
        // const binaryStr = reader.result;
        // console.log(binaryStr);

        formData.append('file', file);

        /* Send request to our api route */
        const response = await fetch('/api/openai/proxy', {
          method: 'POST',
          body: formData,
        });

        const body = (await response.json()) as { status: 'ok' | 'fail'; message: string };
        setIsLoading(false);
        alert(body.message);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="w-[300px] h-[300px] bg-red-800 p-10 justify-center">
      <input {...getInputProps()} />
      <p className="text-white">
        Drag 'n' drop some sheeeeeeeet
        {isLoading && ` Wait, please...`}
      </p>
    </div>
  );
}
