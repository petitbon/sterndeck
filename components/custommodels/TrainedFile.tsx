import { ITrainingFile } from '@interfaces/ITrainingFile';

export interface Props {
  trainingFile: ITrainingFile;
}

export default function TrainedFile({ trainingFile }: Props) {
  const truncate = (input: string) => (input?.length > 20 ? `${input.substring(0, 14)}...` : input);
  return (
    <div className="flex p-2 mx-2 border items-center">
      <div className="text-[12px] m-1 w-1/3 font-semibold items-center">
        <div className="flex py-1 tems-center inline-block align-middle">
          <label className="">{truncate(trainingFile?.id)}</label>
        </div>
      </div>
    </div>
  );
}
