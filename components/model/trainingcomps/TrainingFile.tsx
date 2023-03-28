import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ITrainingFile } from '@interfaces/ITrainingFile';

import moment from 'moment';
import IconFileCode from '@components/icons/IconFileCode';

import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { getFileURL } from '@cloudstorage/storage';

export interface Props {
  training_file: ITrainingFile;
}

export default function TrainingFile({ training_file }: Props) {
  const [signedURLState, setSignedURLState] = useState<string>('');
  const [ago, setAgo] = useState<string>('');

  useEffect(() => {
    const fetchURL = async () => {
      const storage = getStorage();
      const trainingFileURL: string = await getFileURL(training_file.path);
      const starsRef = ref(storage, trainingFileURL);
      const url: string = await getDownloadURL(starsRef);
      setSignedURLState(url);
    };
    fetchURL();

    const dateInSec: any = training_file.created_at;
    const dateInMills: any = dateInSec * 1000;
    const date = new Date(dateInMills);
    //let myDate = date.toLocaleDateString();
    //let myTime = date.toLocaleTimeString();
    //myDate = myDate.replaceAll('/', '-');
    setAgo(moment(date).fromNow());
  }, [training_file]);

  const truncate = (input: string) => (input?.length > 40 ? `${input.substring(0, 18)}...${input.slice(-19)}` : input);

  return (
    <div className="flex w-full  text-xs border items-center">
      <div className="flex w-full flex-row items-center">
        <div className="flex py-1 w-1/2 items-center inline-block align-middle">
          <IconFileCode />
          {truncate(training_file?.id)}{' '}
        </div>
        <div className="mx-4 flex w-1/2 flew-row justify-end items-center">
          <div className="mx-2">uploaded {ago}</div>
          <Link className="hover:text-stern-blue justify-end mx-2  font-semibold " href={signedURLState}>
            [Download]
          </Link>
        </div>
      </div>
    </div>
  );
}
