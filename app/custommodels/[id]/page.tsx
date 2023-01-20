'use client';

import { useSystemContext } from '@context/SystemProvider';
import UserCheck from '@components/user/UserCheck';
import { getCustommodel, getUploadedTrainingFiles, deleteTrainingFile } from '@context/firebase/firestore';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useEffect } from 'react';
import SternDrop from '@components/custommodels/SternDrop';
import { Custommodel, DeletedFileConfirmation, UploadedTrainingFile } from '@interfaces/Custommodel';
import { deleteFile } from '@context/firebase/storage';

interface Props {
  params: {
    id: string;
  };
}

export default function CustommodelEdit({ params }: Props) {
  const { authUser, isSignedIn } = useSystemContext();
  const [custommodel, setCustommodel] = useState({} as Custommodel);
  const [uploadedTrainingFiles, setUploadedTrainingFiles] = useState<UploadedTrainingFile[]>([]);

  useEffect(() => {
    const doit = async () => {
      if (isSignedIn) {
        const unsubscribe = await getCustommodel(authUser.uid, params.id, setCustommodel);
        return () => unsubscribe();
      }
    };
    doit();
  }, [authUser]);

  useEffect(() => {
    const doit = async () => {
      if (authUser) {
        const unsubscribe = await getUploadedTrainingFiles(authUser.uid, params.id, setUploadedTrainingFiles);
        return () => unsubscribe();
      }
    };
    doit();
  }, [authUser]);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Custommodel>();

  const deleteUpFile = async (file: UploadedTrainingFile): Promise<DeletedFileConfirmation | null> => {
    const response = await fetch(`/api/openai/training-files/${file.id}`, { method: 'DELETE' });
    const confirmation: DeletedFileConfirmation = await response.json();
    deleteTrainingFile(authUser.uid, params.id, file.id);
    const df = deleteFile(file.trainingFilePath);
    console.log(df);
    return confirmation;
  };

  const onSubmit: SubmitHandler<Custommodel> = async (data: Custommodel) => {};

  const train = async (): Promise<null> => {
    const response = await fetch(`/api/openai/fine-tunes/create`, { method: 'POST' });
    console.log("let's do this");
    console.log(response);
    return null;
  };

  return (
    <>
      <UserCheck>
        <div className="flex justify-center p-4 h-screen">
          <form className="custommodel-form" onSubmit={handleSubmit(onSubmit)}>
            <div>
              {' '}
              <div> Custom Model {custommodel?.title} </div>
              <div> Base Model {custommodel?.basemodel} </div>
              <div> Number of Epochs {custommodel?.epochs} </div>
              <SternDrop id={params.id as string} fileJob="training" />
              <ul>
                {uploadedTrainingFiles.map((upfile: UploadedTrainingFile, i: number) => (
                  <li className="relative m-2" key={i + 'li'}>
                    <div className="flex p-2 mx-2 border" key={i + '1'}>
                      <div className="text-[12px] m-1 w-1/2 font-semibold" key={i + '2'}>
                        {upfile.id}
                      </div>
                      <div className="flex m-2 w-1/2 font-semibold justify-end" key={i + '3'}>
                        <button className="btn-primary" onClick={() => deleteUpFile(upfile)} key={i + '4'}>
                          Delete File
                        </button>
                      </div>
                    </div>
                  </li>
                ))}{' '}
              </ul>
              <div className="flex justify-center pt-4">
                {' '}
                <button className="btn-primary bg-orange-600" onClick={() => train()}>
                  Train
                </button>
              </div>
            </div>
          </form>
        </div>
      </UserCheck>
    </>
  );
}
