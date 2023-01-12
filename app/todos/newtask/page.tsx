import AuthCheck from '@components/auth/AuthCheck';
import NewTodo from '@components/todos/NewTodo';

export default function Newtask() {
  return (
    <AuthCheck>
      <NewTodo />
    </AuthCheck>
  );
}
