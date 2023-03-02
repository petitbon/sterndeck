import '../styles/globals.css';

import { SystemProvider } from '@context/SystemProvider';

import UserAuth from '@components/user/UserAuth';
import ModelPane from '@components/navbar/ModelPane';
import KeysPane from '@components/navbar/KeysPane';
import UserCheck from '@components/user/UserCheck';

export const metadata = {
  title: 'STERNDECK',
  robots: {
    index: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SystemProvider>
          <aside className="sidenavbar border-r border-gray-500 accent-stern-blue">
            {/* ----------------------------------------------------------------------------------- */}
            <div className="h-[80px] m-3 text-6xl">
              <div className="flex">STERNDECK</div>
            </div>
            {/* ----------------------------------------------------------------------------------- */}
            <div className="flex-1">
              <UserCheck>
                <ModelPane />
              </UserCheck>
            </div>
            {/* ----------------------------------------------------------------------------------- */}
            <div className="flex-1 flex-col w-full bottom-14 absolute">
              <div className="h-px my-2 bg-gray-500 border-0" />
              <UserAuth />
              <UserCheck>
                <KeysPane />
              </UserCheck>
            </div>
            {/* ----------------------------------------------------------------------------------- */}
            <div className="flex-1 bottom-0 absolute w-full h-[26px]">
              <div className="w-full h-[26px] bottom-0 absolute">
                <p className="m-1 text-xs text-center text-gray-300"> &#169; STERNDECK 2023</p>
              </div>
            </div>
            {/* ----------------------------------------------------------------------------------- */}
          </aside>
          <div className="content w-auto accent-stern-blue">{children}</div>
        </SystemProvider>
      </body>
    </html>
  );
}
