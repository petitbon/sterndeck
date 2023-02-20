import { useState, useEffect } from 'react';

import { updateModel } from '@firestore/models';

type TBaseModel = string;

export interface Props {
  user_uid: string;
  model_id: string;
  baseModel: TBaseModel;
}

const basemodelsOptions = ['ada', 'babbage', 'curie', 'davinci'];

export default function BaseModel({ user_uid, model_id, baseModel }: Props) {
  const [baseModelInput, setBaseModelInput] = useState<string>('');

  useEffect(() => {
    setBaseModelInput(baseModel || '');
  }, [baseModel]);

  const saveBaseModel = async (e: any) => {
    setBaseModelInput(e.target.value);
    await updateModel(user_uid, model_id, { model: e.target.value });
  };

  return (
    <>
      {' '}
      <div className="rounded items-center text-white hover:text-black">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Base Model</label>
        <select className="custom-base-model-select" onChange={(e) => saveBaseModel(e)} value={baseModelInput}>
          {basemodelsOptions.map((value, i) => (
            <option value={value} key={i}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
