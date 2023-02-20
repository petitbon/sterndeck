import { useState, useEffect } from 'react';

import { updateModel } from '@firestore/models';

type TLearningRate = number;

export interface Props {
  user_uid: string;
  model_id: string;
  learning_rate: TLearningRate;
}

export default function LearningRate({ user_uid, model_id, learning_rate }: Props) {
  const [learnRateInput, setLearnRateInput] = useState<number | null>(null);

  useEffect(() => {
    setLearnRateInput(learning_rate || null);
  }, [learning_rate]);

  const saveLearnRate = async (e: any) => {
    setLearnRateInput(e.target.value);
    await updateModel(user_uid, model_id, { learning_rate_multiplier: e.target.value });
  };

  return (
    <>
      {' '}
      <div className="rounded items-center text-white hover:text-black">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Learning Rate Multiplier {learnRateInput}</label>
        <input
          onChange={(e) => setLearnRateInput(+e.target.value)}
          onMouseUp={(e) => saveLearnRate(e)}
          id="small-range"
          max={0.2}
          min={0.02}
          step={0.01}
          type="range"
          value={!!learnRateInput ? learnRateInput : ''}
          className="input-range "
        />
      </div>
    </>
  );
}
