'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function HomePane() {
  const router = useRouter();

  return (
    <>
      <div className="flex w-full my-4">
        <div className="ml-6 rounded-none flex w-full duration-200 cursor-pointer hover:bg-stern-blue hover:text-white" onClick={() => router.push(`/`)}>
          {usePathname() == '/' && <span className="w-[6px] bg-stern-blue mr-2 "></span>}
          <span className="text-[18px]"> Instructions </span>
        </div>
      </div>
    </>
  );
}
