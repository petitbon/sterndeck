import { useState, useEffect } from 'react';

import TextInput from '@components/shared/TextInput';

import { updateModel } from '@firestore/models';
import { getUseCases } from '@firestore/useCases';
import { IUseCase } from '@interfaces/IUseCase';

export interface Props {
  user_uid: string;
  model_id: string;
}

export default function Title({ user_uid, model_id }: Props) {
  const [useCaseState, setUseCaseState] = useState<string>('');
  const [useCases, setUseCases] = useState<IUseCase[]>([]);
  const [titleState, setTitleState] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      await getUseCases(setUseCases, setUseCaseState);
    };
    fetchData();
  }, [model_id]);

  const createModel = async () => {
    await updateModel(user_uid, model_id, { title: titleState, use_case: useCaseState });
  };

  const checkNext = () => {
    if (useCaseState !== '' && titleState !== '') {
      return true;
    }
    return false;
  };

  return (
    <>
      <TextInput size="text-4xl" text="" inputType="text" onChange={(t: string) => setTitleState(t)} placeHolder="Name this model" />
      <div className="flex flex-row">
        {useCases?.map((use_case: IUseCase, i) => (
          <div
            className={`m-4 p-4 border-2 hover:border-stern-blue cursor-pointer ${useCaseState == use_case.id ? 'border-stern-blue' : 'border-gray-200'}`}
            onClick={() => setUseCaseState(use_case.id)}
            key={i}
          >
            <div className="text-l font-semibold pb-2" key={i + 'b'}>
              {use_case.long_name} {useCaseState == use_case.id ? '(selected)' : ''}
            </div>
            <p className="text-sm" key={i + 'c'}>
              {use_case.description}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-end pt-4 items-center">
        <span className="text-sm px-4">Select the use case for your model. This selection cannot be changed later</span>
        <button className={`btn-small w-[100px] ${!checkNext() ? 'cursor-not-allowed text-gray-300' : ''}`} disabled={!checkNext()} onClick={() => createModel()}>
          Next
        </button>
      </div>
    </>
  );
}
