import Link from 'next/link';

function EmptyTodo({ tab }: any) {
  return (
    <div className="h-full flex flex-col justify-center items-center md:w-1/2 md:m-auto">
      <p className="align-middle text-center mt-4 mb-6 px-6">{tab.message}</p>
      {tab.title === 'In Progress' && (
        <Link href="/todos/newtask">
          <i className="bi bi-plus-lg mr-2"></i>
          <span className="capitalize">Add new task</span>
        </Link>
      )}
    </div>
  );
}

export default EmptyTodo;
