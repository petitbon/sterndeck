import '../styles/globals.css';

import { SystemProvider } from '@context/SystemProvider';

import HomePane from '@components/navbar/HomePane';
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
          <div className="min-h-screen">
            <div className="fixed top-0 left-0 w-full h-[80px] bg-white z-10 flex flex-row border-b border-gray-300">
              {/* ----------------------------------------------------------------------------------- */}
              <div className="flex w-full items-center">
                <div className="flex text-4xl p-4 pl-6">
                  <span className="text-sterndeck-royal tracking-wider">Stern</span>
                  <span className="text-red-600 tracking-wider">Deck</span>
                </div>
              </div>
              <div className="flex w-[320px] items-center">
                <UserPane />
              </div>
              {/* ----------------------------------------------------------------------------------- */}
            </div>
            <div className="flex mt-16">
              <aside className="flex-none w-full md:max-w-xs h-screen sticky top-0 border-r border-gray-300 ">
                {/* ----------------------------------------------------------------------------------- */}
                <div className="flex h-[80px] text-4xl p-4 pl-6">
                  <UserCheck>
                    <HomePane />
                  </UserCheck>
                </div>
                {/* ----------------------------------------------------------------------------------- */}
                <div className="flex-1">
                  <UserCheck>
                    <ModelPane />
                  </UserCheck>
                </div>
                {/* ----------------------------------------------------------------------------------- */}
              </aside>
              <main className="w-full overflow-y-scroll">{children}</main>
            </div>
          </div>
        </SystemProvider>
      </body>
    </html>
  );
}
