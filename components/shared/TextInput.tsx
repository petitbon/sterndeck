import { useState, useEffect } from 'react';

import { IconPencil } from '@tabler/icons-react';
import { IconDeviceFloppy } from '@tabler/icons-react';

export interface Props {
  text: string;
  inputType: string;
  onChange: any;
  placeHolder: string;
  size: string;
}

export default function TextInput({ text, inputType, onChange, placeHolder, size }: Props) {
  const [textInput, setTextInput] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [inputIsCool, setInputIsCool] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    setTextInput(text || '');
  }, [text]);

  const editText = () => {
    setEdit(edit ? false : true);
  };

  const handleTextChange = (e: any) => {
    checkInput(e.target.value);
    setEdit(true);
    setTextInput(e.target.value);
  };

  const checkInput = (input: string) => {
    if (input.length < 3) {
      setInputIsCool(false);
      setErrorMessage('It must be at least 3 characters long!');
    } else {
      setInputIsCool(true);
      setErrorMessage('');
    }
  };

  const saveText = async () => {
    if (textInput) {
      if (inputIsCool) {
        onChange(textInput);
      }
      if (!inputIsCool) {
        setTextInput(text);
        setErrorMessage('');
      }
    }
    setEdit(false);
  };

  return (
    <>
      {' '}
      <div className="flex flex-col">
        {' '}
        <div className={`flex items-center space-x-4 text-white hover:text-black ${size}`}>
          <input
            className={edit ? 'edit-text-input' : 'custom-text-input'}
            value={textInput}
            onChange={(e) => handleTextChange(e)}
            onBlur={() => saveText()}
            onFocus={() => editText()}
            type={inputType}
            placeholder={placeHolder}
          />
          {edit ? (
            <button className="btn-edit" onClick={() => saveText()}>
              <IconDeviceFloppy className={'pointer-events-none w-8 h-8 transform ' + (edit ? 'text-stern-blue' : 'text-gray-300')} />
            </button>
          ) : (
            <button className="btn-edit" onClick={() => editText()}>
              <IconPencil />
            </button>
          )}
        </div>
        <div className="text-red-500"> {errorMessage} </div>
      </div>
    </>
  );
}
