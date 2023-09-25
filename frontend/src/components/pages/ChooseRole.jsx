import { Link } from "react-router-dom";

const ChooseRole = () => {
  return (
    <div>
      <h2 className="sr-only">Steps</h2>

      <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100">
        <ol className="relative z-10 flex justify-center text-sm font-medium text-gray-500">
          <li className="flex items-center gap-2 bg-white p-2">
            <span className="h-6 w-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold">
              1
            </span>

            <span className="hidden sm:block"> Details </span>
          </li>

          <li className="flex items-center gap-2 bg-white p-2">
            <span className="h-6 w-6 rounded-full bg-blue-600 text-center text-[10px]/6 font-bold text-white">
              2
            </span>

            <span className="hidden sm:block"> Choose your Role </span>
          </li>

          <li className="flex items-center gap-2 bg-white p-2">
            <span className="h-6 w-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold">
              3
            </span>

            <span className="hidden sm:block"> Finished </span>
          </li>
        </ol>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
          <div className="rounded-2xl border border-blue-600 p-6 shadow-sm ring-1 ring-blue-600 sm:order-last sm:px-8 lg:p-12">
            <div className="text-center">
              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  Discover Event
                </strong>
              </p>
            </div>

            <div className="mt-8 block rounded-full border border-blue-600 bg-blue-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-blue-700 hover:ring-1 hover:ring-indigo-700 focus:outline-none focus:ring active:text-indigo-500">
              <Link to="/explore"> Discover Event </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-600 p-6 shadow-sm ring-1 ring-blue-600 sm:order-last sm:px-8 lg:p-12">
            <div className="text-center">
              <p className="mt-2 sm:mt-4">
                <b className="text-2xl font-bold text-gray-900 sm:text-4xl">
                  <Link to="/create-event/:id"> Create Event </Link>
                </b>
              </p>
            </div>

            <div className="mt-8 block rounded-full border border-blue-600 bg-blue-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-blue-700 hover:ring-1 hover:ring-indigo-700 focus:outline-none focus:ring active:text-indigo-500">
              <Link to="/create-event/:id"> Create Event </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseRole;
