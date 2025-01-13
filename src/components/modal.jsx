import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TreatModal = ({ isOpen, onClose, slide, onNext, onPrevious }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";

      // Add keyboard navigation
      const handleKeyPress = (e) => {
        if (e.key === "ArrowRight") onNext();
        if (e.key === "ArrowLeft") onPrevious();
        if (e.key === "Escape") onClose();
      };

      window.addEventListener("keydown", handleKeyPress);
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    } else {
      document.body.style.overflow = "unset";
      document.body.style.position = "static";
      document.body.style.width = "auto";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.position = "static";
      document.body.style.width = "auto";
    };
  }, [isOpen, onNext, onPrevious, onClose]);

  const features = [{ name: "Description", description: slide?.description }];

  if (!isOpen || !slide) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-magicPeach rounded-lg p-6 max-w-7xl w-full mx-4 overflow-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Navigation Arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" strokeWidth={2} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" strokeWidth={2} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Content Details Section */}
          <div>
            <h2 className="text-3xl py-4 font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
              {slide.title}
            </h2>
            <dl className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 sm:gap-y-16 lg:gap-x-8">
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

            {/* Contact Section */}
            <div className="border-t border-gray-200 pt-14 mt-8 flex justify-center">
              <div className="text-center">
                <dt className="font-medium text-gray-900 flex">
                  Contact for more information
                </dt>
                <dd className="cursor-pointer text-4xl">
                  <Link to="/contact">
                    <button className="px-4 py-2 mt-5 bg-magicTeal shadow-md shadow-gray-500 text-black font-semibold rounded-lg hover:ring-4 hover:ring-white hover:text-yellow-300 transition duration-300">
                      Order
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
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    imageSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
};

export default TreatModal;
