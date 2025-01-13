import { useEffect, useCallback, memo, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ModalImage = memo(({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Add image preloading
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
  }, [src]);

  return (
    <div className="relative flex justify-center items-center w-full -full">
      {/* Progressive loading with blur-up technique */}
      <div
        className={`absolute inset-0 bg-gray-200 rounded-lg
                   ${isLoaded ? "animate-fadeOut" : "animate-pulse"}`}
      />
      <img
        src={src}
        alt={alt}
        className={`rounded-lg bg-gray-100 w-full h-full object-cover object-center
                   transition-all duration-300 
                   ${
                     isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                   }`}
        decoding="async"
        fetchPriority="high"
      />
    </div>
  );
});
ModalImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

ModalImage.displayName = "ModalImage";

// Navigation button component for consistent prev/next buttons
const NavigationButton = memo(({ direction, onClick, children }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`absolute ${
        direction === "left" ? "left-4" : "right-4"
      } top-1/2 transform -translate-y-1/2 
      bg-white p-2 rounded-full shadow-lg 
      hover:bg-gray-100 transition-colors z-10
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-magicTeal`}
      aria-label={`${direction === "left" ? "Previous" : "Next"} slide`}
    >
      {children}
    </button>
  );
});

NavigationButton.propTypes = {
  direction: PropTypes.oneOf(["left", "right"]).isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

NavigationButton.displayName = "NavigationButton";

// Main modal component
const TreatModal = memo(({ isOpen, onClose, slide, onNext, onPrevious }) => {
  // Memoized keyboard event handler
  const handleKeyPress = useCallback(
    (e) => {
      switch (e.key) {
        case "ArrowRight":
          onNext();
          break;
        case "ArrowLeft":
          onPrevious();
          break;
        case "Escape":
          onClose();
          break;
        default:
          break;
      }
    },
    [onNext, onPrevious, onClose]
  );

  // Handle body scroll lock and keyboard events
  useEffect(() => {
    if (!isOpen) return;

    const originalStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      width: document.body.style.width,
      paddingRight: document.body.style.paddingRight,
    };

    // Prevent layout shift from scrollbar disappearing
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    window.addEventListener("keydown", handleKeyPress);

    // Cleanup function to restore original styles
    return () => {
      Object.entries(originalStyles).forEach(([key, value]) => {
        document.body.style[key] = value;
      });
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, handleKeyPress]);
  useEffect(() => {
    if (!isOpen || !slide) return;

    // Function to preload an image
    const preloadImage = (imageSrc) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = imageSrc;
      document.head.appendChild(link);

      // Cleanup function
      return () => document.head.removeChild(link);
    };

    // Start performance measurement
    performance.mark("modal-open-start");

    // Initialize loading state
    const cleanupFunctions = [];

    // Preload the current image
    cleanupFunctions.push(preloadImage(slide.imageSrc));

    // Cleanup function
    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());

      // End performance measurement
      performance.mark("modal-open-end");
      performance.measure("modal-open", "modal-open-start", "modal-open-end");
    };
  }, [isOpen, slide]);

  if (!isOpen || !slide) return null;

  return (
    <div
      className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 
                 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative bg-magicPeach rounded-lg p-6 max-w-7xl w-full mx-4 
                   overflow-auto max-h-[90vh] shadow-xl transform 
                   transition-transform duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 
                     w-8 h-8 flex items-center justify-center rounded-full 
                     hover:bg-gray-200 transition-colors
                     focus:outline-none focus:ring-2 focus:ring-offset-2 
                     focus:ring-magicTeal"
          onClick={onClose}
          aria-label="Close modal"
        >
          <span className="text-2xl">&times;</span>
        </button>

        {/* Navigation buttons */}
        <NavigationButton direction="left" onClick={onPrevious}>
          <ChevronLeft className="w-6 h-6 text-gray-700" strokeWidth={2} />
        </NavigationButton>

        <NavigationButton direction="right" onClick={onNext}>
          <ChevronRight className="w-6 h-6 text-gray-700" strokeWidth={2} />
        </NavigationButton>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Content section */}
          <div className="space-y-6">
            <h2
              id="modal-title"
              className="text-3xl py-4 font-bold tracking-tight text-gray-900 
                         sm:text-4xl text-center"
            >
              {slide.title}
            </h2>

            <dl className="space-y-6">
              <div className="border-t border-gray-200 pt-4 text-center">
                <dt className="font-medium text-gray-800">Description</dt>
                <dd className="mt-2 text-sm text-gray-600">
                  {slide.description}
                </dd>
              </div>
            </dl>

            {/* Contact section */}
            <div className="border-t border-gray-200 pt-8">
              <div className="text-center space-y-4">
                <dt className="font-medium text-gray-900">
                  Contact for more information
                </dt>
                <dd>
                  <Link
                    to="/contact"
                    className="inline-block px-6 py-3 bg-magicTeal text-black 
                             font-semibold rounded-lg shadow-md shadow-gray-500
                             hover:ring-4 hover:ring-white hover:text-yellow-300 
                             transition duration-300 focus:outline-none 
                             focus:ring-2 focus:ring-offset-2 focus:ring-magicTeal"
                  >
                    Order
                  </Link>
                </dd>
              </div>
            </div>
          </div>

          {/* Image section */}
          <ModalImage src={slide.imageSrc} alt={slide.title} />
        </div>
      </div>
    </div>
  );
});

TreatModal.displayName = "TreatModal";

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
