import '../styles/globals.css';

import { SystemProvider } from '@context/SystemProvider';

import HomePane from '@components/navbar/HomePane';
import ModelPane from '@components/navbar/ModelPane';
import UserMenu from '@components/navbar/UserMenu';
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
          <div className="flex flex-col h-screen relative">
            <nav className="flex h-16 items-center border-b border-gray-300 z-10">
              {/* ----------------------------------------------------------------------------------- */}
              <div className="flex w-full items-center ">
                <div className="flex text-4xl p-4 pl-6">
                  <span className="text-sterndeck-royal tracking-wider">Stern</span>
                  <span className="text-red-600 tracking-wider">Deck</span>
                </div>
              </div>
              <div className="flex w-[320px]">
                <UserMenu />
              </div>
              {/* ----------------------------------------------------------------------------------- */}
            </nav>
            <div className="flex flex-1 overflow-hidden z-2">
              <aside className="hidden sm:block  w-64 overflow-y-auto border-r border-gray-300 ">
                {/* ----------------------------------------------------------------------------------- */}
                <div className="">
                  <UserCheck>
                    <HomePane />
                  </UserCheck>
                </div>
                {/* ----------------------------------------------------------------------------------- */}
                <div className="">
                  <UserCheck>
                    <ModelPane />
                  </UserCheck>
                </div>
                {/* ----------------------------------------------------------------------------------- */}
                <div className="bottom-0 w-64 absolute h-[26px] border-t border-r border-gray-300 justify-end bg-white">
                  <p className="m-1 text-xs text-right text-gray-400"> &#169; STERNDECK 2023</p>
                </div>
              </aside>
              <main className="flex flex-1 overflow-y-auto paragraph px-4 z-1"> {children}</main>
            </div>
          </div>
        </SystemProvider>
      </body>
    </html>
  );
}
