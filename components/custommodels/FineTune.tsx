import { ITrainingFile } from '@interfaces/ITrainingFile';

export interface Props {
  trainingFiles: Array<ITrainingFile>;
  modelId: string;
}

export default function FineTune({ trainingFiles, modelId }: Props) {
  return (
    <div className="flex-1 p-2 mx-2 border items-center border ">
      <div className="text-[12px] m-1 w-1/2 font-semibold items-center">
        <div className="flex py-1 tems-center inline-block align-middle">Fine Tune ID</div>
      </div>
      <div className="flex m-2 w-1/2 font-semibold justify-end">
        <button className="btn-primary bg-orange-600">Cancel</button>
        <button className="btn-primary bg-orange-600">Status</button>
      </div>
    </div>
  );
}
