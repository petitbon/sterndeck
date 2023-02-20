import { useState, useEffect } from 'react';

import { updateModel } from '@firestore/models';

type TComputeClassification = boolean;

export interface Props {
  user_uid: string;
  model_id: string;
  compute_classification_metrics: TComputeClassification;
}

export default function ComputeClassification({ user_uid, model_id, compute_classification_metrics }: Props) {
  const [computeClassificationInput, setComputeClassificationInput] = useState<boolean>(false);

  useEffect(() => {
    setComputeClassificationInput(compute_classification_metrics || false);
  }, [compute_classification_metrics]);

  const saveComputeClassification = async (evalue: boolean) => {
    setComputeClassificationInput(evalue);
    await updateModel(user_uid, model_id, { compute_classification_metrics: evalue });
  };

  return (
    <>
      {' '}
      <div className="flex flex-col items-center">
        <label className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">Classification Metrics</label>
        <label className="relative flex items-center cursor-pointer">
          <input onChange={(e) => saveComputeClassification(e.target.checked)} type="checkbox" checked={computeClassificationInput} className="sr-only peer" />
          <div className="toggle peer"></div>{' '}
        </label>
      </div>
    </>
  );
}
