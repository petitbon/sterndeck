import { useState, useEffect } from 'react';

import { IconFileCode } from '@tabler/icons-react';
import { ITrainingFile } from '@interfaces/ITrainingFile';
import { IModel } from '@interfaces/IModel';

export interface Props {
  training_file: ITrainingFile;
  model: IModel;
}

export default function TrainingFile({ training_file, model }: Props) {
  const [trainingFileState, setTrainingFileState] = useState<ITrainingFile>({} as ITrainingFile);

  useEffect(() => {
    setTrainingFileState(training_file || {});
  }, [training_file]);

  const truncate = (input: string) => (input?.length > 18 ? `${input.substring(0, 16)}...` : input);

  return (
    <div className="flex text-xs border items-center">
      <div className="m-1 w-1/3 font-semibold items-center">
        <div className="flex py-1 items-center inline-block align-middle">
          <IconFileCode size={25} stroke={1.5} className="text-gray-500" />
          <label className="">{truncate(trainingFileState?.id)}</label>
        </div>
      </div>
    </div>
  );
}
