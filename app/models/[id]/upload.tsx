import FileDrop from '@components/model/trainingcomps/FileDrop';

import { IModel } from '@interfaces/IModel';
import { User } from 'firebase/auth';

export interface Props {
  model: IModel;
  user: User;
}

export default function UploadStanza({ model, user }: Props) {
  return (
    <>
      <div className="border">
        <div className="pb-2 flex w-full">
          <div className="w-full p-3 mx-4">
            <FileDrop user={user} model_id={model.id} use_case_id={model.use_case} />
          </div>
        </div>
      </div>
    </>
  );
}
