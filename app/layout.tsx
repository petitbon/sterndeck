import '../styles/globals.css';

import UserAuth from '@components/user/UserAuth';
import ModelPane from '@components/navbar/ModelPane';
import { SystemProvider } from '@context/SystemProvider';
import UserCheck from '@components/user/UserCheck';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SystemProvider>
          <aside className="sidenavbar border-r border-gray-400">
            {/* ----------------------------------------------------------------------------------- */}
            <div className="h-[80px] m-3">
              <div className="flex items-center justofy-left -space-x-[250px]">
                <div className="flex justify-center -space-x-[18px]">
                  <div className="og-blend bg-red-600"> </div>
                  <div className="og-blend bg-pink-400"> </div>
                  <div className="og-blend bg-violet-400"> </div>
                  <div className="og-blend bg-blue-500"> </div>
                  <div className="og-blend bg-green-500"> </div>
                  <div className="og-blend bg-blue-400"> </div>
                  <div className="og-blend bg-red-500"> </div>
                  <div className="og-blend bg-pink-400"> </div>
                  <div className="og-blend bg-violet-400"> </div>
                  <div className="og-blend bg-blue-500"> </div>
                  <div className="og-blend bg-green-500"> </div>
                  <div className="og-blend bg-pink-500"> </div>
                  <div className="og-blend bg-violet-400"> </div>
                  <div className="og-blend bg-blue-400"> </div>
                </div>
                <div className="font-bold text-3xl tracking-widest text-white">STERNDECK</div>
              </div>
            </div>
            {/* ----------------------------------------------------------------------------------- */}

            <div className="items-center justify-center h-auto">
              <UserCheck>
                <ModelPane />
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
          </aside>
          <div className="content">{children}</div>
        </SystemProvider>
      </body>
    </html>
  );
}
