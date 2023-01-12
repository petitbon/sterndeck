import AuthCheck from '@components/auth/AuthCheck';
import Todos from '@components/todos/Todos';

export default function Todo() {
  return (
    <AuthCheck>
      <Todos />
    </AuthCheck>
  );
}
