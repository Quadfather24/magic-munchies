import PropTypes from "prop-types";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

const TreatModal = ({ isOpen, onClose, slide }) => {
  if (!isOpen || !slide) return null;

  // Example features (replace or extend based on your data structure)
  const features = [
    { name: "Name", description: slide.title },
    { name: "Description", description: slide.description },
  ];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-magicPeach rounded-lg p-6 max-w-7xl w-full mx-4 overflow-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Feature Details */}
          <div>
            <h2 className="text-3xl py-4 font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
              {slide.title}
            </h2>
            {/* Feature List */}
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="border-t border-gray-200 pt-4 text-center"
                >
                  <dt className="font-medium text-gray-800">{feature.name}</dt>
                  <dd className="mt-2 text-sm text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Flavor Section */}
            <div className="border-t border-gray-200 pt-14 mt-8 flex justify-center">
              <div className="text-center">
                <dt className="font-medium text-gray-900 flex">
                  Contact for more information
                </dt>
                <div className="flex space-x-44 justify-center">
                  <ChevronDownIcon className="h-5 w-5 mt-4 text-gray-500 transform animate-bounceWithRotateReverse" />
                  <ChevronDownIcon className="h-5 w-5 mt-4 text-gray-500 transform animate-bounceWithRotateNormal" />
                </div>
                <dd className=" cursor-pointer text-4xl">
                  <Link to="/contact">
                    <button className="px-4 py-2 bg-teal-500 text-white font-semibold rounded-lg hover:ring-4 hover:ring-teal-400 hover:text-magicPeach transition duration-300">
                      Click Here
                    </button>
                  </Link>
                </dd>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex justify-center items-center">
            <img
              src={slide.imageSrc}
              alt={slide.title}
              className="rounded-lg bg-gray-100 max-h-[500px] w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

TreatModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    imageSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
};

export default TreatModal;
