import { DefaultSession } from 'next-auth';

export function UserCard({ user }: { user: DefaultSession['user'] }) {
  return (
    <>
      <div className="h-16 grid grid-cols-1 gap-4 content-center">
        <p>{user?.name}</p>
        <p>{user?.email}</p>
      </div>
    </>
  );
}
