import '../styles/globals.css';

import { SystemProvider } from '@context/SystemProvider';

import ModelPane from '@components/navbar/ModelPane';
import UserPane from '@components/navbar/UserPane';
import UserCheck from '@components/user/UserCheck';

export const metadata = {
  wtitle: 'SternDeck',
  robots: {
    index: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-stern-royal-blue accent-stern-blue">
        <SystemProvider>
          <div className="flex">
            <aside className="flex-none w-full md:max-w-xs h-screen sticky top-0 border-r border-gray-500 ">
              {/* ----------------------------------------------------------------------------------- */}
              <div className="flex h-[80px] text-4xl p-4 pl-6">
                <span className="text-sterndeck-royal tracking-wider">Stern</span>
                <span className="text-red-600 tracking-wider">Deck</span>
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
                <UserPane />
              </div>
              {/* ----------------------------------------------------------------------------------- */}
              <div className="flex-1 bottom-0 absolute w-full h-[26px]">
                <div className="w-full h-[26px] bottom-0 absolute">
                  <p className="m-1 text-xs text-center text-gray-300"> &#169; STERNDECK 2023</p>
                </div>
              </div>
              {/* ----------------------------------------------------------------------------------- */}
            </aside>
            <main className="flex-1">{children}</main>
          </div>
        </SystemProvider>
      </body>
    </html>
  );
}
