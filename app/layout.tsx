import '../styles/globals.css';

import { SystemProvider } from '@context/SystemProvider';

import UserAuth from '@components/user/UserAuth';
import ModelPane from '@components/navbar/ModelPane';
import UserCheck from '@components/user/UserCheck';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SystemProvider>
          <aside className="sidenavbar border-r border-gray-400">
            {/* ----------------------------------------------------------------------------------- */}
            <div className="h-[80px] m-3 text-6xl">
              <div className="flex">STERNDECK</div>
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
