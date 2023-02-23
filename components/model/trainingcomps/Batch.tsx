import { useState, useEffect } from 'react';

import { updateModel } from '@firestore/models';

type TBatch = number | undefined;

export interface Props {
  user_uid: string;
  model_id: string;
  batch: TBatch;
}

export default function Batch({ user_uid, model_id, batch }: Props) {
  const [batchState, setBatchState] = useState<number>(4);

  useEffect(() => {
    if (batch) {
      setBatchState(batch || 4);
    }
  }, [batch]);

  const saveBatch = async (e: any) => {
    setBatchState(e.target.value);
    await updateModel(user_uid, model_id, { hyperparams: { batch_size: batchState } });
  };

  return (
    <>
      {' '}
      <div className="">
        <label className="custom-label">Batch Size {batchState}</label>
        <input
          onChange={(e) => setBatchState(+e.target.value)}
          onMouseUp={(e) => saveBatch(e)}
          id="small-range"
          max={256}
          min={0}
          step={1}
          type="range"
          value={batchState}
          className="input-range "
        />
      </div>
    </>
  );
}
