import { useState, useEffect } from 'react';

import { updateModel } from '@firestore/models';

type TLearningRate = number | undefined;

export interface Props {
  user_uid: string;
  model_id: string;
  learning_rate: TLearningRate;
}

export default function LearningRate({ user_uid, model_id, learning_rate }: Props) {
  const [learnRateState, setLearnRateState] = useState<number | null>(null);

  useEffect(() => {
    setLearnRateState(learning_rate || null);
  }, [learning_rate]);

  const saveLearnRate = async (e: any) => {
    setLearnRateState(e.target.value);
    await updateModel(user_uid, model_id, { hyperparams: { learning_rate_multiplier: learnRateState } });
  };

  return (
    <>
      {' '}
      <div className="">
        <label className="custom-label">Learning Rate Mult. {learnRateState}</label>
        <input
          onChange={(e) => setLearnRateState(+e.target.value)}
          onMouseUp={(e) => saveLearnRate(e)}
          id="small-range"
          max={0.2}
          min={0.02}
          step={0.01}
          type="range"
          value={!!learnRateState ? learnRateState : ''}
          className="input-range "
        />
      </div>
    </>
  );
}
