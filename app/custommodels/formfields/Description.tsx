export default function Description() {
  return (
    <>
      <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
      <input
        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="description"
      />
      <p className="text-red-500 text-xs italic">Please describe the model</p>
    </>
  );
}
