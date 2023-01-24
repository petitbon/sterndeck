import { ISdTrainingFile, IDeletedFileConfirmation } from '@interfaces/Custommodel';
import { deleteTrainingFile } from '@context/firebase/firestore';
import { useSystemContext } from '@context/SystemProvider';
import { deleteFile } from '@context/firebase/storage';
import { useFormContext } from 'react-hook-form';

export interface Props {
  sdTrainingFile: ISdTrainingFile;
  sdCustommodelId: string;
}

export default function TrainingFile({ sdTrainingFile, sdCustommodelId }: Props) {
  const { authUser } = useSystemContext();
  const { register } = useFormContext();

  const deleteSdTrainingFile = async (sdfile: ISdTrainingFile): Promise<IDeletedFileConfirmation | null> => {
    const response = await fetch(`/api/openai/training-files/${sdfile.id}`, { method: 'DELETE' });
    const confirmation: IDeletedFileConfirmation = await response.json();
    deleteTrainingFile(authUser.uid, sdCustommodelId, sdfile.id);
    deleteFile(sdfile.training_file_path);
    return confirmation;
  };

  return (
    <div className="flex p-2 mx-2 border items-center">
      <div className="text-[12px] m-1 w-1/2 font-semibold items-center">
        <div className="flex py-1 tems-center inline-block align-middle">
          <input {...register('trainThisFile')} className="radio-primary" type="radio" value={sdTrainingFile.id} />
          <label className="">{sdTrainingFile.id}</label>
        </div>
      </div>
      <div className="flex m-2 w-1/2 font-semibold justify-end">
        <button className="btn-primary" onClick={() => deleteSdTrainingFile(sdTrainingFile)}>
          Delete File
        </button>
      </div>
    </div>
  );
}
