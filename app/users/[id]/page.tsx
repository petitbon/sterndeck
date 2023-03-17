'use client';

import { useEffect, useState } from 'react';
import { useSystemContext } from '@context/SystemProvider';

import { updateKey } from '@firestore/keys';
import { IKey } from '@interfaces/IKey';

import { getKeys } from '@firestore/keys';
import { Dialog } from '@headlessui/react';
import IconTrash from '@components/icons/IconTrash';

interface Props {
  params: {
    id: string;
  };
}

export default function UserPref({ params }: Props) {
  const { authUser, isSignedIn } = useSystemContext();
  const [keysState, setKeysState] = useState<IKey[]>([]);
  const [tokenState, setTokenState] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  let [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      const fetchData = async () => {
        await getKeys(authUser.uid, setKeysState);
      };
      fetchData();
    }
  }, [authUser]);

  const closeModal = () => {
    if (tokenState.length != 51) {
      setErrorMessage('API key is not valid.');
    } else {
      setErrorMessage('');
      const newKey: Partial<IKey> = {
        api_key: tokenState,
        user_uid: authUser.uid,
        status: 'active',
        created_at: new Date(),
      };
      updateKey(newKey.api_key as string, newKey);
      setTokenState(newKey.api_key as string);
      setIsOpen(false);
    }
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
      <div className="flex h-screen">
        <ul className="relative">
          <li className="relative">
            <div className="m-1 p-1 flex flex-row">
              <div>
                <span className="text-[15px] ml-4">Api Keys</span>
              </div>
              <div onClick={openModal}>
                <span className="text-[11px] pl-4 hover:text-stern-blue cursor-pointer font-semibold">[+]</span>
              </div>
            </div>
          </li>

          {keysState?.map((key: IKey, i) => (
            <li className="relative" key={i}>
              <div className="p-1 flex flex-row items-center" key={i}>
                <div className="text-[13px] ml-6" key={i}>
                  {key.api_key}
                </div>
                <div className="text-[13px] ml-6" key={i + 100}>
                  {key.created_at.toDate().toDateString()}
                </div>
                <div className="p-2 hover:text-stern-blue cursor-pointer " onClick={() => updateKey(key.id, { status: 'disabled' })}>
                  <IconTrash />
                </div>
                <></>
              </div>
            </li>
          ))}
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
