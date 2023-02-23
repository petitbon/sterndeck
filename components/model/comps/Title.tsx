import { useState, useEffect } from 'react';

import { IconPencil } from '@tabler/icons-react';
import { IconDeviceFloppy } from '@tabler/icons-react';

import { updateModel } from '@firestore/models';

export interface Props {
  user_uid: string;
  model_id: string;
  title: string;
}

export default function Title({ user_uid, model_id, title }: Props) {
  const [titleInput, setTitleInput] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [inputIsCool, setInputIsCool] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    setTitleInput(title || '');
  }, [title]);

  const editTitle = () => {
    setEdit(edit ? false : true);
  };

  const handleTitleChange = (e: any) => {
    checkInput(e.target.value);
    setEdit(true);
    setTitleInput(e.target.value);
  };

  const checkInput = (input: string) => {
    if (input.length < 3) {
      setInputIsCool(false);
      setErrorMessage('Title must be at least 3 characters long!');
    } else {
      setInputIsCool(true);
      setErrorMessage('');
    }
  };

  const saveTitle = async () => {
    if (titleInput) {
      if (inputIsCool) {
        await updateModel(user_uid, model_id, { title: titleInput });
      }
      if (!inputIsCool) {
        setTitleInput(title);
        setErrorMessage('');
      }
    }
    setEdit(false);
  };

  return (
    <>
      {' '}
      <div className="flex items-center text-white hover:text-black">
        <input
          className={edit ? 'edit-title-input' : 'custom-title-input'}
          value={titleInput}
          onChange={(e) => handleTitleChange(e)}
          onBlur={() => saveTitle()}
          onFocus={() => editTitle()}
          type="text"
          placeholder="Title for the model"
        />
        {edit ? (
          <button className="btn-edit" onClick={() => saveTitle()}>
            <IconDeviceFloppy className={'pointer-events-none w-8 h-8 transform ' + (edit ? 'text-stern-blue' : 'text-gray-300')} />
          </button>
        ) : (
          <button className="btn-edit" onClick={() => editTitle()}>
            <IconPencil />
          </button>
        )}
      </div>
      <div className="text-red-500"> {errorMessage} </div>
    </>
  );
}
