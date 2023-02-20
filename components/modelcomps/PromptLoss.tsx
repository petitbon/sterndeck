import { useState, useEffect } from 'react';

import { updateModel } from '@firestore/models';

type TPromptLoss = number;

export interface Props {
  user_uid: string;
  model_id: string;
  prompt_loss_weight: TPromptLoss;
}

export default function PromptLoss({ user_uid, model_id, prompt_loss_weight }: Props) {
  const [promptLossInput, setPromptLossInput] = useState<number>(0.01);

  useEffect(() => {
    setPromptLossInput(prompt_loss_weight || 0.01);
  }, [prompt_loss_weight]);

  const savePromptLoss = async (e: any) => {
    setPromptLossInput(e.target.value);
    await updateModel(user_uid, model_id, { prompt_loss_weight: e.target.value });
  };

  return (
    <>
      {' '}
      <div className="rounded items-center text-white hover:text-black">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prompt Loss Weight {promptLossInput}</label>
        <input
          onChange={(e) => setPromptLossInput(+e.target.value)}
          onMouseUp={(e) => savePromptLoss(e)}
          id="small-range"
          max={0.1}
          min={0.01}
          step={0.01}
          type="range"
          value={promptLossInput}
          className="input-range "
        />
      </div>
    </>
  );
}
