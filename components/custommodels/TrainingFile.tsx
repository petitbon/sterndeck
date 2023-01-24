import { useSystemContext } from '@context/SystemProvider';
import { useFormContext } from 'react-hook-form';
import { deleteStorageFile } from '@cloudstorage/storage';

import { ITrainingFile } from '@interfaces/ITrainingFile';
import { IDeletedFileConfirmation } from '@interfaces/IDeletedFileConfirmation';

import { deleteTrainingFile } from '@firestore/trainingFiles';

export interface Props {
  trainingFile: ITrainingFile;
  modelId: string;
}

export default function TrainingFile({ trainingFile, modelId }: Props) {
  const { authUser } = useSystemContext();
  const { register } = useFormContext();

  const deleteFile = async (file: ITrainingFile): Promise<IDeletedFileConfirmation | null> => {
    const response = await fetch(`/api/openai/training-files/${file.id}`, { method: 'DELETE' });
    const confirmation: IDeletedFileConfirmation = await response.json();
    deleteTrainingFile(authUser.uid, modelId, file.id);
    deleteStorageFile(file.path);
    return confirmation;
  };

  return (
    <div className="flex p-2 mx-2 border items-center">
      <div className="text-[12px] m-1 w-1/2 font-semibold items-center">
        <div className="flex py-1 tems-center inline-block align-middle">
          <input {...register('trainThisFile')} className="radio-primary" type="radio" value={trainingFile?.id} />
          <label className="">{trainingFile?.id}</label>
        </div>
      </div>
      <div className="flex m-2 w-1/2 font-semibold justify-end">
        <button className="btn-primary" onClick={() => deleteFile(trainingFile)}>
          Delete File
        </button>
      </div>
    </div>
  );
}
