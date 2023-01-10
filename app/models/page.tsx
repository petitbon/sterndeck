'use client';

import React from 'react';
import { useSession } from 'next-auth/react';

export default function Models() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = React.useState(false);
  const inputFileRef = React.useRef<HTMLInputElement | null>(null);

  const handleOnClick = async (e: React.MouseEvent<HTMLInputElement>) => {
    console.log(e);
    /* Prevent form from submitting by default */
    e.preventDefault();

    /* If file is not selected, then show alert message */ if (!inputFileRef.current?.files?.length) {
      alert('Please, select file you want to upload');
      return;
    }
    setIsLoading(true);

    /* Add files to FormData */
    const formData = new FormData();
    Object.values(inputFileRef.current.files).forEach((file) => {
      formData.append('file', file);
    });

    /* Send request to our api route */
    const response = await fetch('/api/openai/proxy', {
      method: 'POST',
      body: formData,
    });

    const body = (await response.json()) as { status: 'ok' | 'fail'; message: string };

    alert(body.message);

    if (body.status === 'ok') {
      inputFileRef.current.value = '';
      // Do some stuff on successfully upload
    } else {
      // Do some stuff on error
    }

    setIsLoading(false);
  };

  if (session) {
    return (
      <>
        <form className="p-10">
          <div className="text-white p-10">
            <input type="file" name="myfile" ref={inputFileRef} multiple />
          </div>
          <div className="text-white p-10">
            <input type="submit" value="Upload" disabled={isLoading} onClick={handleOnClick} />
            {isLoading && ` Wait, please...`}
          </div>
        </form>
      </>
    );
  }
}
