import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getTask, UpdateTask } from '@lib/firebase/task.firestore';
import { useAuthContext } from '@context/AuthContext';

function SingleTodo() {
  const { user } = useAuthContext();
  const router = useRouter();
  const { todoId } = router.query;
  const [todo, setTodo] = useState<any>(null);

  useEffect(() => {
    if (todoId && typeof todoId === 'string') {
      getTask(user.id, todoId)
        .then((task) => setTodo(task))
        .catch((error) => console.log(error.message));
    }
  }, []);

  function MarkTaskDone() {
    if (todo) {
      UpdateTask({
        ...todo,
        updatedAt: new Date(),
        complete: true,
      })
        .then(() => {
          setTodo({
            ...todo,
            complete: true,
          });
          console.log('Marked Done');
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }

  return (
    <div className="h-full border py-8 px-8 md:w-1/2 md:m-auto">
      <Link href={`/todo`}>
        {' '}
        <i className="bi bi-chevron-left mr-1"></i>
        <span>Back</span>{' '}
      </Link>
      <div className="flex flex-col mt-10">
        <h3 className="text-2xl font-semibold mb-4 max-w-full truncate">{todo.title}</h3>
        <p className="truncate max-w-full">{todo.description}</p>
        <p className="mt-4">Due At: {new Date(todo.dueAt).toISOString()}</p>
        {!todo.complete && (
          <button onClick={MarkTaskDone} className="mt-6 py-3 bg-black text-white rounded-md">
            Done
          </button>
        )}
      </div>
    </div>
  );
}

export default SingleTodo;
