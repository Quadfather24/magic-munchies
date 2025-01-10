function About() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-52 md:w-48 md:rounded-none md:rounded-s-lg"
          src="/api/placeholder/400/320"
          alt="Logo of East"
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="/api/placeholder/400/320"
              alt="Gallery image 1"
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="/api/placeholder/400/320"
              alt="Gallery image 2"
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="/api/placeholder/400/320"
              alt="Gallery image 3"
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="/api/placeholder/400/320"
              alt="Gallery image 4"
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="/api/placeholder/400/320"
              alt="Gallery image 5"
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="/api/placeholder/400/320"
              alt="Gallery image 6"
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="/api/placeholder/400/320"
              alt="Gallery image 7"
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="/api/placeholder/400/320"
              alt="Gallery image 8"
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="/api/placeholder/400/320"
              alt="Gallery image 9"
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="/api/placeholder/400/320"
              alt="Gallery image 10"
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="/api/placeholder/400/320"
              alt="Gallery image 11"
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="/api/placeholder/400/320"
              alt="Gallery image 12"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
