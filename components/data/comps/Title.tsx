import TextInput from '@components/shared/TextInput';

import { updateData } from '@firestore/datas';

export interface Props {
  user_uid: string;
  data_id: string;
  title: string;
}

export default function Title({ user_uid, data_id, title }: Props) {
  const saveTitle = async (newTitle: string) => {
    await updateData(user_uid, data_id, { title: newTitle });
  };

  return (
    <>
      <TextInput size="text-4xl" text={title} inputType="text" onChange={(t: string) => saveTitle(t)} placeHolder="Name this Data set" />
    </>
  );
}
