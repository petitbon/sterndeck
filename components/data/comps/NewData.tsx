import { useState, useEffect } from 'react';
import { updateData } from '@firestore/datas';
import { getUseCases } from '@firestore/useCases';
import { IUseCase } from '@interfaces/IUseCase';

export interface Props {
  user_uid: string;
  data_id: string;
}

export default function NewData({ user_uid, data_id }: Props) {
  const [useCaseState, setUseCaseState] = useState<string>('');
  const [useCases, setUseCases] = useState<IUseCase[]>([]);
  const [titleState, setTitleState] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      await getUseCases(setUseCases, setUseCaseState);
    };
    fetchData();
  }, [data_id]);

  const createData = async () => {
    await updateData(user_uid, data_id, { title: titleState, use_case: useCaseState });
  };

  const checkNext = () => {
    if (useCaseState !== '' && titleState !== '') {
      return true;
    }
    return false;
  };

  const saveTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleState(event.target.value);
  };

  return (
    <div className="flex-1 ">
      {' '}
      <div className="w-full px-4">
        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 text-4xl" type="text" onChange={saveTitle} placeholder="Name this data" />
      </div>
      <div className="flex flex-col">
        {useCases?.map((use_case: IUseCase, i) => (
          <div
            className={`m-4 p-4 border-2 hover:border-stern-blue cursor-pointer ${useCaseState == use_case.id ? 'border-stern-blue' : 'border-gray-200'}`}
            onClick={() => setUseCaseState(use_case.id)}
            key={i}
          >
            <div className="text-l font-semibold pb-2" key={i + 'b'}>
              {use_case.long_name} ({use_case.short_name}) {useCaseState == use_case.id ? '✓' : ''}
            </div>

            <p className="text-sm pb-4" key={i}>
              {use_case.description}
            </p>

            <div className="flex flex-row">
              <div className="w-1/2">
                <ul className="text-sm" key={i}>
                  <li className="font-semibold">Fine Tuning Paramters</li>
                  <li>base data: {use_case.model}</li>
                  <li>prompt loss weight: {use_case.hyper_parameters.prompt_loss_weight}</li>
                  <li>learning rate multiplyer: {use_case.hyper_parameters.learning_rate_multiplier}</li>
                </ul>
              </div>
              <div className="w-1/2">
                <ul className="text-sm" key={i}>
                  <li className="font-semibold">Completion Paramters</li>
                  <li>temperature: {use_case.completion_parameters.temperature}</li>
                  <li>frequency penalty: {use_case.completion_parameters.frequency_penalty}</li>
                  <li>presence penalty: {use_case.completion_parameters.presence_penalty}</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-end pt-4 items-center">
        <span className="text-sm px-4"></span>
        <button className={`btn-small w-[100px] ${!checkNext() ? 'cursor-not-allowed text-gray-300' : ''}`} disabled={!checkNext()} onClick={() => createData()}>
          Next
        </button>
      </div>
    </div>
  );
}
