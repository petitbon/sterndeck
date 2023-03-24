'use client';

import { useState, useEffect } from 'react';
import { useSystemContext } from '@context/SystemProvider';
import { useForm, FormProvider } from 'react-hook-form';

import { IData } from '@interfaces/IData';

import { getData } from '@firestore/datas';

import Title from '@components/data/comps/Title';
import NewData from '@components/data/comps/NewData';
import UserCheck from '@components/user/UserCheck';
import EditorStanza from './editor';

interface Props {
  params: {
    id: string;
  };
}

export default function DataEdit({ params }: Props) {
  const { authUser, isSignedIn } = useSystemContext();
  const [data, setData] = useState<IData>({} as IData);

  useEffect(() => {
    if (authUser?.uid) {
      const fetchData = async () => {
        if (isSignedIn) {
          try {
            const disregard = await getData(authUser.uid, params.id, setData);
            return () => {
              disregard();
            };
          } catch (error) {
            console.error('Error fetching data data:', error);
          }
        }
      };
      fetchData();
    }
  }, [authUser]);

  const methods = useForm();
  const onSubmit = (data: any) => null;

  return (
    <>
      <UserCheck>
        <div className="flex-1 p-4">
          <FormProvider {...methods}>
            <form className="" onSubmit={methods.handleSubmit(onSubmit)}>
              {!data?.title ? (
                <div className="pb-4">
                  <NewData user_uid={authUser?.uid} data_id={params.id} />
                </div>
              ) : (
                <div className="pb-4">
                  <Title user_uid={authUser?.uid} data_id={data?.id} title={data?.title} />
                  <div>
                    <ul>
                      <li className="relative m-2">
                        <EditorStanza data={data} />
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </form>
          </FormProvider>
        </div>
      </UserCheck>
    </>
  );
}
