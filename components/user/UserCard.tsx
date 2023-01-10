import Image from 'next/image';
import { DefaultSession } from 'next-auth';

export function UserCard({ user }: { user: DefaultSession['user'] }) {
  let imageSource: string;
  if (user && user.image) {
    imageSource = user.image;
  } else {
    imageSource = 'images/temp.png';
  }

  return (
    <>
      <div className="flex items-center">
        <Image src={imageSource} alt="fynext" width="35" height="35" />
        <div className="text-sm pl-4">
          <p className="text-gray-900 leading-none">{user?.name}</p>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>
    </>
  );
}

/*
 *
 *
 *
 *
 *
    <div className="h-16 grid grid-cols-1 gap-4 content-center">
        <p>{user?.name}</p>
        <p>{user?.email}</p>
      </div>


 */
