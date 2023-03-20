import TextInput from '@components/shared/TextInput';

import { updateModel } from '@firestore/models';

export interface Props {
  user_uid: string;
  model_id: string;
  title: string;
}

export default function Title({ user_uid, model_id, title }: Props) {
  const saveTitle = async (newTitle: string) => {
    await updateModel(user_uid, model_id, { title: newTitle });
  };

  return (
    <>
      <TextInput size="text-4xl" text={title} inputType="text" onChange={(t: string) => saveTitle(t)} placeHolder="Name this model" />
    </>
  );
}
