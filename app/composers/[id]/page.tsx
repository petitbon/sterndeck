'use client';

import { useState, useEffect } from 'react';
import { useSystemContext } from '@context/SystemProvider';
import { useForm, SubmitHandler, FormProvider, FieldValues } from 'react-hook-form';

import { IComposer } from '@interfaces/IComposer';

import { getComposer } from '@firestore/composers';

import UserCheck from '@components/user/UserCheck';

interface Props {
  params: {
    id: string;
  };
}

export default function ComposerEdit({ params }: Props) {
  const { authUser, isSignedIn } = useSystemContext();
  const [composer, setComposer] = useState({} as IComposer);

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
            <form className="customcomposer-form" onSubmit={methods.handleSubmit(onSubmit)}>
              <div>
                <div className="text-4xl"> {composer?.title} </div>
                <ul></ul>
                <ul></ul>
              </div>
            </form>
          </FormProvider>
        </div>
      </UserCheck>
    </>
  );
}
