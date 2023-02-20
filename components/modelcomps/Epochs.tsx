import { useState, useEffect } from 'react';

import { updateModel } from '@firestore/models';

type TEpoch = number;

export interface Props {
  user_uid: string;
  model_id: string;
  n_epochs: TEpoch;
}

export default function Epochs({ user_uid, model_id, n_epochs }: Props) {
  const [epochInput, setEpochInput] = useState<number>(4);

  useEffect(() => {
    setEpochInput(n_epochs || 4);
  }, [n_epochs]);

  const saveEpoch = async (e: any) => {
    setEpochInput(e.target.value);
    await updateModel(user_uid, model_id, { n_epochs: e.target.value });
  };

  return (
    <>
      {' '}
      <div className="rounded items-center text-white hover:text-black">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of Epochs {epochInput}</label>

        <input
          onChange={(e) => setEpochInput(+e.target.value)}
          onMouseUp={(e) => saveEpoch(e)}
          id="small-range"
          max={10}
          min={0}
          step={1}
          type="range"
          value={epochInput}
          className="input-range"
        />
      </div>
    </>
  );
}
