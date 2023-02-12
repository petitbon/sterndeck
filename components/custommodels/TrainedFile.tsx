import { IconFileCode } from '@tabler/icons-react';
import { ITrainingFile } from '@interfaces/ITrainingFile';

export interface Props {
  trainingFile: ITrainingFile;
}

export default function TrainedFile({ trainingFile }: Props) {
  const truncate = (input: string) => (input?.length > 20 ? `${input.substring(0, 14)}...` : input);
  return (
    <div className="flex p-2 mx-2 border items-center">
      <div className="text-[14px] m-1 font-semibold items-center">
        <div className="flex py-1 items-center inline-block align-middle">
          <IconFileCode size={55} stroke={1.5} className="text-gray-500" />
          <label className="">{truncate(trainingFile?.id)}</label>
        </div>
      </div>
    </div>
  );
}
