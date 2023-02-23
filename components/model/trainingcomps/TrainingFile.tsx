import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IconFileCode } from '@tabler/icons-react';
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
          <IconFileCode size={25} stroke={1.5} className="text-gray-500" />
          {truncate(trainingFileState?.id)}{' '}
        </div>
        <div className="mx-4">
          <Link className="hover:text-stern-blue justify-end" href={signedURLState}>
            Download
          </Link>
        </div>
      </div>
    </div>
  );
}
