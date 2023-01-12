import '../styles/globals.css';

import FirebaseLogin from '@components/auth/FirebaseLogin';
import ModelsSection from '@components/navigation/ModelsSection';
import { AuthContextProvider } from '@context/AuthContextProvider';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <div className="sidenavbar">
            <div className="pt-4 pb-2 ">
              <div className="flex items-center">
                <div className="shrink-0"></div>
                <div className="grow ml-3">
                  <FirebaseLogin />
                </div>
              </div>
            </div>

            <hr className="my-2" />
            <ul className="relative px-1">
              <li className="relative">
                <div className="p-2.5 mt-3 flex items-center  px-4 duration-300 text-black">
                  <ModelsSection />
                </div>
              </li>

              <li className="relative pl-8 pr-4">
                <div className="t-3 flex items-center rounded-full duration-300 cursor-pointer hover:bg-blue-300 text-black">
                  <span className="text-[13px] ml-4 text-gray-600">Sandokan</span>
                </div>
              </li>
              <li className="relative pl-8 pr-4">
                <div className="mt-3 flex items-center rounded-full duration-300 cursor-pointer hover:bg-blue-300 text-black">
                  <span className="text-[13px] ml-4 text-gray-600">The masked rider</span>
                </div>
              </li>
              <li className="relative pl-8 pr-4">
                <div className="mt-3 flex items-center rounded-full duration-300 cursor-pointer hover:bg-blue-300 text-black">
                  <span className="text-[13px] ml-4 text-gray-600">Flash Gordon</span>
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
        </AuthContextProvider>
      </body>
    </html>
  );
}
