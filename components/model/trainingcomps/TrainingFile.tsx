import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ITrainingFile } from '@interfaces/ITrainingFile';
import { IModel } from '@interfaces/IModel';

import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export interface Props {
  training_file: ITrainingFile;
  model: IModel;
}

export default function TrainingFile({ training_file, model }: Props) {
  const [trainingFileState, setTrainingFileState] = useState<ITrainingFile>({} as ITrainingFile);
  const [signedURLState, setSignedURLState] = useState<string>('');

  useEffect(() => {
    setTrainingFileState(training_file || {});
    const fetchURL = async () => {
      const storage = getStorage();
      const starsRef = ref(storage, training_file.url);
      const url = await getDownloadURL(starsRef);
      setSignedURLState(url);
    };
    fetchURL();
  }, [training_file]);

  const truncate = (input: string) => (input?.length > 40 ? `${input.substring(0, 18)}...${input.slice(-19)}` : input);

  return (
    <div className="flex text-xs border items-center">
      <div className="flex w-full flex-row font-semibold items-center">
        <div className="flex py-1 w-full items-center inline-block align-middle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-file-code"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
            <path d="M10 13l-1 2l1 2"></path>
            <path d="M14 13l1 2l-1 2"></path>
          </svg>
          {truncate(trainingFileState?.id)}{' '}
        </div>
        <div className="mx-4">
          <Link as="download" className="hover:text-stern-blue justify-end" href={signedURLState}>
            Download
          </Link>
        </div>
      </div>
    </div>
  );
}
