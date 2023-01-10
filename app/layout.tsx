import '../styles/globals.css';

import SessionProvider from './SessionProvider';

import { IconPhoto } from '@tabler/icons';
import UserLogin from '@components/user/UserLogin';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <div className="sidenavbar">
            <div className="pt-4 pb-2 px-6">
              <a href="#!">
                <div className="flex items-center">
                  <div className="shrink-0"></div>
                  <div className="grow ml-3">
                    <UserLogin />
                  </div>
                </div>
              </a>
            </div>
            <ul className="relative px-1">
              <li className="relative">
                <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-black">
                  <IconPhoto size={15} stroke={1.5} />
                  <span className="text-[15px] ml-4 text-gray-600 font-bold">Home</span>
                </div>
              </li>
            </ul>
            <hr className="my-2" />
            <ul className="relative px-1">
              <li className="relative">
                <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-black">
                  <IconPhoto size={15} stroke={1.5} />
                  <span className="text-[15px] ml-4 text-gray-600 font-bold">Home</span>
                </div>
              </li>
            </ul>
            <div className="text-center bottom-0 absolute w-full">
              <hr className="m-0" />
              <p className="py-2 text-sm text-gray-700">STERNDECK</p>
              <p className="py-2 text-sm text-gray-700">AI Tools and Marketplace</p>
            </div>
          </div>
          <div className="content">{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
}
