import Image from 'next/image';
import { User } from 'firebase/auth';

export function UserCard({ user }: { user: User }) {
  let imageSource: string;
  if (user && user.photoURL) {
    imageSource = user.photoURL;
  } else {
    imageSource = 'https://lh3.googleusercontent.com/a/AEdFTp66pfwryV9pHKD1_odl4xpQ60fjbTt9SlrjHi4X=s96-c';
  }
  return (
    <>
      <div className="flex items-center">
        <Image src={imageSource} alt="fynext" width="35" height="35" />
        <div className="text-sm pl-4">
          <p className="text-gray-900 leading-none">{user?.displayName}</p>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>
    </>
  );
}
