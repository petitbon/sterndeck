'use client';

import '../styles/globals.css';

import UserAuth from '@components/user/UserAuth';
import CustommodelPane from '@components/navbar/CustommodelPane';
import { AuthUserProvider } from '@context/AuthUserProvider';
import { SystemProvider } from '@context/SystemProvider';
import UserCheck from '@components/user/UserCheck';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="">
        <AuthUserProvider>
          <SystemProvider fontSize="large">
            <div className="sidenavbar divide-y divide-blue-700 border-r border-blue-700 ">
              {/* ----------------------------------------------------------------------------------- */}
              <div className="h-[60px]">
                <div className="flex items-center justify-left -space-x-[240px]">
                  <div className="flex justify-center -space-x-[18px]">
                    <div className="mix-blend-overlay bg-red-600  w-[42px] h-[60px]"> </div>
                    <div className="mix-blend-overlay bg-pink-400 w-[42px] h-[60px]"> </div>
                    <div className="mix-blend-overlay bg-violet-400  w-[42px] h-[60px]"> </div>
                    <div className="mix-blend-overlay bg-blue-500 w-[42px] h-[60px]"> </div>
                    <div className="mix-blend-overlay bg-green-500  w-[42px] h-[60px]"> </div>
                    <div className="mix-blend-overlay bg-blue-300 w-[42px] h-[60px]"> </div>
                    <div className="mix-blend-overlay bg-red-500  w-[42px] h-[60px]"> </div>
                    <div className="mix-blend-overlay bg-pink-400 w-[42px] h-[60px]"> </div>
                    <div className="mix-blend-overlay bg-violet-400  w-[42px] h-[60px]"> </div>
                    <div className="mix-blend-overlay bg-blue-500 w-[42px] h-[60px]"> </div>
                    <div className="mix-blend-overlay bg-green-500  w-[42px] h-[60px]"> </div>
                    <div className="mix-blend-overlay bg-pink-500  w-[42px] h-[60px]"> </div>
                    <div className="mix-blend-overlay bg-violet-300  w-[42px] h-[60px]"> </div>
                    <div className="mix-blend-overlay bg-blue-300 w-[42px] h-[60px]"> </div>
                    <div className="mix-blend-overlay bg-red-600  w-[44px] h-[60px]"> </div>
                  </div>
                  <div className="font-bold text-3xl tracking-widest text-stern-blue">STERNDECK</div>
                </div>
              </div>
              {/* ----------------------------------------------------------------------------------- */}

              <div className="items-center justify-center h-auto">
                <UserCheck>
                  <CustommodelPane />
                </UserCheck>
              </div>
              {/* ----------------------------------------------------------------------------------- */}
              <div className="flex-1 bottom-0 absolute w-full h-[200px]">
                <div className="my-1">
                  <UserAuth />
                </div>
              </div>
              {/* ----------------------------------------------------------------------------------- */}
              <div className="flex-1 bottom-0 absolute w-full h-[26px]">
                <div className="w-full h-[26px] bottom-0 absolute">
                  {' '}
                  <p className="m-1 text-xs text-center"> &#169; STERNDECK 2023</p>
                </div>
              </div>
              {/* ----------------------------------------------------------------------------------- */}
            </div>
            <div className="content">{children}</div>
          </SystemProvider>
        </AuthUserProvider>
      </body>
    </html>
  );
}
