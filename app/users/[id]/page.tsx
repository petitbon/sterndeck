'use client';

import { useEffect, useState } from 'react';
import { useSystemContext } from '@context/SystemProvider';
import generateApiKey from 'generate-api-key';

import { updateKey } from '@firestore/keys';
import { IKey } from '@interfaces/IKey';

import { getKeys } from '@firestore/keys';
import { Dialog } from '@headlessui/react';
import IconCopy from '@components/icons/IconCopy';
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
    setIsOpen(false);
  };

  const openModal = () => {
    const newKey: Partial<IKey> = {
      api_key: generateApiKey({ method: 'string', pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', prefix: 'sterndeck', length: 48 }) as string,
      user_uid: authUser.uid,
      status: 'active',
      created_at: new Date(),
    };
    updateKey(newKey.api_key as string, newKey);
    setTokenState(newKey.api_key as string);
    setIsOpen(true);
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
                    <input className="p-2 text-[11px] w-full" value={tokenState} type="text" disabled />
                  </div>
                  <div
                    className="pl-2 cursor-pointer w-[40px] flex items-center justify-center"
                    onClick={() => {
                      navigator.clipboard.writeText(tokenState);
                    }}
                  >
                    <IconCopy size={35} stroke={1.5} />
                  </div>
                </div>

                <div className="mt-4">
                  <button type="button" className="btn-primary " onClick={closeModal}>
                    Got it, thanks!
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
