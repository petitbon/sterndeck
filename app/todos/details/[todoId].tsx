import AuthCheck from '@components/auth/AuthCheck';
import SingleTodo from '@components/todos/SingleTodo';

export default function DetailTodo() {
  return (
    <AuthCheck>
      <SingleTodo />
    </AuthCheck>
  );
}
