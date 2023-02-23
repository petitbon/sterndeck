import { useState, useEffect } from 'react';

import { updateModel } from '@firestore/models';

type TComputeClassification = boolean | undefined;

export interface Props {
  user_uid: string;
  model_id: string;
  compute_classification_metrics: TComputeClassification;
}

export default function ComputeClassification({ user_uid, model_id, compute_classification_metrics }: Props) {
  const [computeClassificationState, setComputeClassificationState] = useState<boolean>(false);

  useEffect(() => {
    setComputeClassificationState(compute_classification_metrics || false);
  }, [compute_classification_metrics]);

  const saveComputeClassification = async (evalue: boolean) => {
    setComputeClassificationState(evalue);
    await updateModel(user_uid, model_id, { hyperparams: { compute_classification_metrics: computeClassificationState } });
  };

  return (
    <>
      {' '}
      <div className="">
        <label className="custom-label">Classification Metrics</label>
        <label className="relative flex items-center cursor-pointer">
          <input onChange={(e) => saveComputeClassification(e.target.checked)} type="checkbox" checked={computeClassificationState} className="sr-only peer" />
          <div className="toggle peer"></div>{' '}
        </label>
      </div>
    </>
  );
}
