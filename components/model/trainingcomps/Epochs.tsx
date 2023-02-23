import { useState, useEffect } from 'react';

import { updateModel } from '@firestore/models';

type TEpoch = number | undefined;

export interface Props {
  user_uid: string;
  model_id: string;
  n_epochs: TEpoch;
}

export default function Epochs({ user_uid, model_id, n_epochs }: Props) {
  const [epochState, setEpochState] = useState<number>(4);

  useEffect(() => {
    setEpochState(n_epochs || 4);
  }, [n_epochs]);

  const saveEpoch = async (e: any) => {
    setEpochState(e.target.value);
    await updateModel(user_uid, model_id, { hyperparams: { n_epochs: epochState } });
  };

  return (
    <>
      {' '}
      <div className="">
        <label className="custom-label">N. Epochs {epochState}</label>
        <input
          onChange={(e) => setEpochState(+e.target.value)}
          onMouseUp={(e) => saveEpoch(e)}
          id="small-range"
          max={10}
          min={0}
          step={1}
          type="range"
          value={epochState}
          className="input-range"
        />
      </div>
    </>
  );
}
