'use client';

import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';

import { useSystemContext } from '@context/SystemProvider';

import IconTrash from '@components/icons/IconTrash';

import { getKey } from '@firestore/keys';
import { updateKey } from '@firestore/keys';

import { IKey } from '@interfaces/IKey';

interface Props {
  params: {
    id: string;
  };
}

const truncate = (input: string) => `${input.substring(0, 3)}...${input.slice(-4)}`;

export default function UserPref({ params }: Props) {
  const { authUser, isSignedIn } = useSystemContext();
  const [keyState, setKeyState] = useState<IKey>({} as IKey);
  const [keyDate, setKeyDate] = useState<Date>(new Date());
  const [tokenState, setTokenState] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  let [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      const fetchData = async () => {
        const unsub = await getKey(authUser.uid, setKeyState);
        return () => unsub();
      };
      fetchData();
    }
  }, [authUser]);

  useEffect(() => {
    if (keyState?.created_at) {
      const dateInSec: any = keyState.created_at;
      const dateInMills: any = dateInSec * 1000;
      const date = new Date(dateInMills);
      setKeyDate(date);
    }
  }, [keyState]);

  const closeModal = async () => {
    if (tokenState.length != 51) {
      setErrorMessage('API key is not valid.');
    } else {
      setErrorMessage('');
      const newKey: Partial<IKey> = {
        api_key: truncate(tokenState),
        user_uid: authUser.uid,
        status: 'active',
        created_at: new Date(),
      };
      await makeItASecret(tokenState);
      updateKey(authUser.uid, newKey);
      setTokenState(newKey.api_key as string);
      setIsOpen(false);
    }
  };

  const makeItASecret = async (secret: string) => {
    const token = await authUser.getIdToken(true);
    const payload = { user_uid: authUser.uid, secret: secret };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/user-key`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
    const confirmation: any = response;
    return confirmation;
  };

  const openModal = () => {
    setErrorMessage('');
    setTokenState('');
    setIsOpen(true);
  };

  const saveToken = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokenState(event.target.value);
  };

  return (
    <>
      <div className="flex-1 h-screen ">
        <ul className="relative ">
          <li className="relative">
            <div className="flex p-8">
              <div>
                <span className="text-4xl">Api Keys</span>
              </div>
            </div>
          </li>

          {!keyState?.api_key && (
            <li className="relative">
              <div className="p-1 flex flex-row items-center ">
                <div className="text-[13px] ml-6"></div>
                <div className="text-[13px] ml-6">
                  <div onClick={openModal}>
                    <span className="pt-4 mt-4 hover:text-stern-blue cursor-pointer font-semibold">[+ Add Key]</span>
                  </div>
                </div>
                <div className="p-2 hover:text-stern-blue cursor-pointer "></div>
                <></>
              </div>
            </li>
          )}

          {keyState?.api_key && (
            <li className="relative w-full">
              <div className="p-1 flex flex-row items-center">
                <div className="text-[13px] ml-6 ">{keyState.api_key}</div>
                <div className="text-[13px] ml-6">{keyDate.toLocaleString()}</div>
                <div className="p-2 hover:text-stern-blue cursor-pointer " onClick={() => updateKey(keyState.id, { status: 'disabled' })}>
                  <IconTrash />
                </div>
                <></>
              </div>
            </li>
          )}
        </ul>

        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Your API Key
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Copy and save this secret key somewhere safe and accessible. For security reasons, you won't be able to view it again. If you lose this secret key, you'll need
                    to generate a new one.
                  </p>
                </div>

                <div className="flex flex-row w-full py-4">
                  <div className="w-full">
                    <input className="edit-text-input" type="text" onChange={saveToken} placeholder="paste api key from openai" />
                  </div>
                  <div className="text-red-500"> {errorMessage} </div>
                </div>

                <div className="mt-4">
                  <button type="button" className="btn-primary " onClick={closeModal}>
                    Save!
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
}
