export default function Name() {
  return (
    <>
      <label className="block text-gray-700 text-sm font-bold mb-2">Custom Model</label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="name"
        type="text"
        placeholder="Name"
      />{' '}
    </>
  );
}
