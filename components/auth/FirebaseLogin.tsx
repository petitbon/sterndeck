'use client';

import { useAuthContext } from '@context/AuthContext';
import { signInWithGoogle } from '@lib/firebase/authentication';
import { useRouter } from 'next/navigation';
import { UserCard } from '@components/user/UserCard';

function FirebaseLogin() {
  const router = useRouter();
  const { user } = useAuthContext();

  const LoginWithGoogle = () => {
    signInWithGoogle()
      .then(() => {
        router.push('/models');
      })
      .catch((error: any) => {
        console.log(error.message);
      });
  };

  if (!user) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <p className="font-normal text-5xl mb-2">STERNDECK</p>
        <p className="text-base my-2">AI Tools and Marketplace</p>
        <div className="flex mt-2">
          <button className="flex items-center justify-center border-2 py-2 px-6 rounded-md mr-4" onClick={LoginWithGoogle}>
            <i className="bi bi-google mr-2"></i>
            <span>Google</span>
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <p className="font-normal text-5xl mb-2">STERNDECK</p>
        <p className="text-base my-2">AI Tools and Marketplace</p>
        <div className="flex mt-2">
          <UserCard user={user}></UserCard>
        </div>
      </div>
    );
  }
}

export default FirebaseLogin;
