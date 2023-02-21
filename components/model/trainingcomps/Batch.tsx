import { useState, useEffect } from 'react';

import { updateModel } from '@firestore/models';

type TBatch = number;

export interface Props {
  user_uid: string;
  model_id: string;
  batch: TBatch;
}

export default function Batch({ user_uid, model_id, batch }: Props) {
  const [batchInput, setBatchInput] = useState<number>(4);

  useEffect(() => {
    setBatchInput(batch || 4);
  }, [batch]);

  const saveBatch = async (e: any) => {
    setBatchInput(e.target.value);
    await updateModel(user_uid, model_id, { batch_size: e.target.value });
  };

  return (
    <>
      {' '}
      <div className="">
        <label className="custom-label">Batch Size {batchInput}</label>
        <input
          onChange={(e) => setBatchInput(+e.target.value)}
          onMouseUp={(e) => saveBatch(e)}
          id="small-range"
          max={256}
          min={0}
          step={1}
          type="range"
          value={batchInput}
          className="input-range "
        />
      </div>
    </>
  );
}
