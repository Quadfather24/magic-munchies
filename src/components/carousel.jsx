import { useState } from "react";
import PropTypes from "prop-types";
import Carousel from "react-spring-3d-carousel";
import { config } from "@react-spring/web";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwipeable } from "react-swipeable"; // Add this import

const TreatCarousel = ({ category, onSlideClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Add state to track swipe animation
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % category.slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? category.slides.length - 1 : prevIndex - 1
    );
  };

  // Configure swipe handlers with visual feedback
  const swipeHandlers = useSwipeable({
    onSwipeStart: () => {
      // Indicate that a swipe is in progress
      setIsAnimating(true);
    },
    onSwipedLeft: () => {
      // Navigate to next slide
      handleNextSlide();
      // Reset animation after transition
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    },
    onSwipedRight: () => {
      // Navigate to previous slide
      handlePrevSlide();
      // Reset animation after transition
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    },
    onSwiping: (eventData) => {
      // Add resistance to the swipe movement
      const moveX = eventData.deltaX * 0;
      // Update the swipe offset for visual feedback
      document.documentElement.style.setProperty(
        "--carousel-swipe-offset",
        `${moveX}px`
      );
    },
    onSwipeEnd: () => {
      // Reset the swipe offset when gesture ends
      document.documentElement.style.setProperty(
        "--carousel-swipe-offset",
        "0px"
      );
      setIsAnimating(false);
    },
    // Configure swipe sensitivity and behavior
    preventDefaultTouchmoveEvent: true,
    trackMouse: false,
    delta: 50,
    swipeDuration: 500,
    touchEventOptions: { passive: true },
  });

  // Create carousel slides with swipe animation classes
  const carouselSlides = category.slides.map((slide) => ({
    key: slide.key,
    content: (
      <div
        onClick={() => onSlideClick(slide)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onSlideClick(slide);
          }
        }}
        className={`cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
          transition-transform duration-300 ${
            isAnimating
              ? "transform translate-x-[var(--carousel-swipe-offset)]"
              : ""
          }`}
      >
        <div className="relative w-full">
          <div className="aspect-w-16 aspect-h-9 sm:aspect-w-3 sm:aspect-h-2 md:aspect-w-16 md:aspect-h-9">
            <img
              src={slide.imageSrc}
              alt={slide.title}
              className="w-full h-full object-contain rounded-lg shadow-md shadow-gray-900 transition-transform duration-300 transform hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <div className="relative flex flex-col w-full">
      <div className="py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center animate__animated animate__bounce animate__repeat-3">
          <span className="relative inline-block">
            <span className="relative">{category.title}</span>
          </span>
        </h2>
      </div>

      {/* Add swipeHandlers to the carousel container */}
      <div className="relative w-full" {...swipeHandlers}>
        <div className="h-64 sm:h-96 md:h-112 lg:h-128 px-4 sm:px-8 md:px-16 lg:px-24">
          <Carousel
            slides={carouselSlides}
            goToSlide={currentIndex}
            offsetRadius={2}
            animationConfig={config.gentle}
            showNavigation={false}
          />
        </div>

        {/* Navigation buttons with Lucide icons */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-2 sm:left-4 md:left-8 lg:left-12 top-1/2 transform -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" strokeWidth={2} />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-2 sm:right-4 md:right-8 lg:right-12 top-1/2 transform -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

TreatCarousel.propTypes = {
  category: PropTypes.shape({
    // The ID property from your original definition
    id: PropTypes.string.isRequired,

    // The title property that's used in the h2 element
    title: PropTypes.string.isRequired,

    // The slides array that's used in the carousel
    slides: PropTypes.arrayOf(
      PropTypes.shape({
        // The key property used for mapping slides
        key: PropTypes.number.isRequired,

        // The image source used in the img element
        imageSrc: PropTypes.string.isRequired,

        // The title property used for alt text and accessibility
        title: PropTypes.string.isRequired,

        // The description property used in the modal
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,

  // The click handler for slide interaction
  onSlideClick: PropTypes.func.isRequired,
};
export default TreatCarousel;
