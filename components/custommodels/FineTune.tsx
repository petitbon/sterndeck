import { ITrainingFile } from '@interfaces/ITrainingFile';
import { IFineTune } from '@interfaces/IFineTune';

import TrainedFile from '@components/custommodels/TrainedFile';

export interface Props {
  fineTune: IFineTune;
  modelId: string;
}

export default function FineTune({ fineTune, modelId }: Props) {
  return (
    <div className="flex-1 p-2 mx-2 border items-center border ">
      <div className="text-[12px] m-1 font-semibold items-center">
        <div className="flex py-1 tems-center inline-block align-middle"></div>
        <div className="flex py-1 tems-center inline-block align-middle"></div>
      </div>

      <ul>
        <li className="relative m-2" key="">
          Fine Tune: {fineTune.id}
        </li>
      </ul>

      <ul>
        {fineTune.training_files.map((file: ITrainingFile, i: number) => (
          <li className="relative m-2" key={i}>
            <TrainedFile trainingFile={file} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/*
 *
export interface IFineTune {
  id: string;
  object: string;
  model: string;
  created_at: Date;
  events: [
    {
      object: string;
      created_at: Date;
      level: string;
      message: string;
    }
  ];
  fine_tuned_model: null;
  hyperparams: {
    batch_size: number;
    learning_rate_multiplier: number;
    n_epochs: number;
    prompt_loss_weight: number;
  };
  organization_id: string;
  result_files: Array<string>;
  status: string;
  validation_files: Array<string>;
  training_files: Array<ITrainingFile>;
  updated_at: Date;
}
 */
