'use client';

import { IconPhoto } from '@tabler/icons';
import { useRouter } from 'next/navigation';

export default function ModelsSection() {
  const router = useRouter();
  return (
    <>
      <IconPhoto size={15} stroke={1.5} />
      <span className="text-[15px] ml-4 text-gray-600 font-bold">Models</span>
      <button
        onClick={() => router.push('/models')}
        className="ml-[18px] text-sm w-[80px] h-[25px] bg-white text-black bg-red-200 hover:bg-red-400 rounded-full"
      >
        Add New
      </button>
    </>
  );
}
