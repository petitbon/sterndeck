import { useSystemContext } from '@context/SystemProvider';
import { deleteStorageFile } from '@cloudstorage/storage';

import { ITrainingFile } from '@interfaces/ITrainingFile';
import { IModel } from '@interfaces/IModel';
import { IFineTune } from '@interfaces/IFineTune';
import { IDeletedFileConfirmation } from '@interfaces/IDeletedFileConfirmation';

import { deleteTrainingFile } from '@firestore/trainingFiles';
import { addFineTune } from '@firestore/fineTunes';

export interface Props {
  trainingFile: ITrainingFile;
  model: IModel;
}

export interface ITrainData {
  training_file: string;
  model: string;
}

export default function TrainingFile({ trainingFile, model }: Props) {
  const { authUser } = useSystemContext();

  const truncate = (input: string) => (input?.length > 20 ? `${input.substring(0, 14)}...` : input);

  const deleteFile = async (file: ITrainingFile): Promise<IDeletedFileConfirmation | null> => {
    const response = await fetch(`/api/openai/training-files/${file.id}`, { method: 'DELETE' });
    const confirmation: IDeletedFileConfirmation = await response.json();
    deleteTrainingFile(authUser.uid, model.id, file.id);
    deleteStorageFile(file.path);
    trainingFile = {} as ITrainingFile;
    return confirmation;
  };

  const train = async (file: ITrainingFile): Promise<Partial<IFineTune> | null> => {
    let trainData: ITrainData = {
      training_file: file.id,
      model: model.model,
    };

    let fineTune: IFineTune;

    try {
      const response = await fetch(`/api/openai/fine-tunes/create`, { method: 'POST', body: JSON.stringify(trainData) });
      const data: any = await response.json();
      console.log(data);
      fineTune = data.result;
      await addFineTune(authUser.uid, model.id, fineTune);
      return fineTune;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <div className="flex p-2 mx-2 border items-center">
      <div className="text-[12px] m-1 w-1/3 font-semibold items-center">
        <div className="flex py-1 tems-center inline-block align-middle">
          <label className="">{truncate(trainingFile?.id)}</label>
        </div>
      </div>

      <div className="flex m-2 w-1/3 font-semibold justify-end">
        <button className="btn-primary" onClick={() => train(trainingFile)}>
          Train
        </button>
      </div>

      <div className="flex m-2 w-1/3 font-semibold justify-end">
        <button className="btn-primary" onClick={() => deleteFile(trainingFile)}>
          Delete File
        </button>
      </div>
    </div>
  );
}
