'use client';

import { useState, useEffect } from 'react';
import { useSystemContext } from '@context/SystemProvider';
import { useForm, SubmitHandler, FormProvider, FieldValues } from 'react-hook-form';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IComposite } from '@interfaces/IComposite';
import { getComposer } from '@firestore/composers';
import { IModel } from '@interfaces/IModel';
import { getModels } from '@firestore/models';
import UserCheck from '@components/user/UserCheck';
import Container from '@components/draggable/Container';

interface Props {
  params: {
    id: string;
  };
}

export default function ComposerEdit({ params }: Props) {
  const { authUser, isSignedIn } = useSystemContext();
  const [composite, setComposer] = useState({} as IComposite);

  const [models, setModels] = useState<IModel[]>([]);
  useEffect(() => {
    if (isSignedIn) {
      const fetchData = async () => {
        const unsubscribe = await getModels(authUser.uid, setModels);
        return () => unsubscribe();
      };
      fetchData();
    }
  }, [authUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (isSignedIn) {
        const disregard = await getComposer(authUser.uid, params.id, setComposer);
        return () => {
          disregard();
        };
      }
    };
    fetchData();
  }, [authUser]);

  const methods = useForm();
  const onSubmit = (data: any) => console.log('DATA FROM EDIT PAGE: ', data);

  return (
    <>
      <UserCheck>
        <div className="flex justify-center p-4 h-screen">
          <FormProvider {...methods}>
            <form className="custom-form" onSubmit={methods.handleSubmit(onSubmit)}>
              <div>
                <div className="text-4xl"> {composite?.title} </div>
                <ul className="block p-10"></ul>
                <ul>
                  <DndProvider backend={HTML5Backend}>
                    <Container allModels={models} userUid={authUser.uid} compositeId={composite.id} />
                  </DndProvider>
                </ul>
              </div>
            </form>
          </FormProvider>
        </div>
      </UserCheck>
    </>
  );
}
