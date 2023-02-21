import { useState, useEffect } from 'react';

import FileDrop from '@components/model/trainingcomps/FileDrop';

import { IModel } from '@interfaces/IModel';

export interface Props {
  user_uid: string;
  model: IModel;
}

export default function UploadStanza({ user_uid, model }: Props) {
  const [modelInput, setModelInput] = useState<IModel>({} as IModel);

  useEffect(() => {
    setModelInput(model || {});
  }, [model]);

  return (
    <>
      <div className="border">
        <div className="pb-2 flex w-full">
          <div className="w-full p-3 mx-4">
            <FileDrop user_uid={user_uid} model_id={modelInput.id} />
          </div>
        </div>
      </div>
    </>
  );
}
