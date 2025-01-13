import { useState } from "react";
import PropTypes from "prop-types";
import Carousel from "react-spring-3d-carousel";
import { config } from "@react-spring/web";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSwipeable } from "react-swipeable";

const TreatCarousel = ({ category, onSlideClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % category.slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? category.slides.length - 1 : prevIndex - 1
    );
  };

  const swipeHandlers = useSwipeable({
    onSwipeStart: () => {
      setIsAnimating(true);
    },
    onSwipedLeft: () => {
      handleNextSlide();
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    },
    onSwipedRight: () => {
      handlePrevSlide();
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    },
    onSwiping: (eventData) => {
      const moveX = eventData.deltaX * 0;
      document.documentElement.style.setProperty(
        "--carousel-swipe-offset",
        `${moveX}px`
      );
    },
    onSwipeEnd: () => {
      document.documentElement.style.setProperty(
        "--carousel-swipe-offset",
        "0px"
      );
      setIsAnimating(false);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: false,
    delta: 50,
    swipeDuration: 500,
    touchEventOptions: { passive: true },
  });

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
          transition-transform duration-300 w-full ${
            isAnimating
              ? "transform translate-x-[var(--carousel-swipe-offset)]"
              : ""
          }`}
      >
        <div className="relative w-full max-w-screen-2xl mx-auto">
          <div className="aspect-w-16 aspect-h-9 sm:aspect-w-3 sm:aspect-h-2 md:aspect-w-16 md:aspect-h-9">
            <img
              src={slide.imageSrc}
              alt={slide.title}
              className="w-full h-full object-contain rounded-lg shadow-md shadow-gray-900 transition-transform duration-300 transform hover:scale-105 
                       sm:w-11/12 sm:mx-auto md:w-10/12 lg:w-9/12 xl:w-8/12 2xl:w-7/12"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <div className="relative flex flex-col w-full max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <div className="py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-center animate__animated animate__bounce animate__repeat-3">
          <span className="relative inline-block">
            <span className="relative">{category.title}</span>
          </span>
        </h2>
      </div>

      <div className="relative w-full" {...swipeHandlers}>
        <div className="h-48 sm:h-64 md:h-80 lg:h-96 xl:h-112 2xl:h-128">
          <Carousel
            slides={carouselSlides}
            goToSlide={currentIndex}
            offsetRadius={2}
            animationConfig={config.gentle}
            showNavigation={false}
          />
        </div>

        <button
          onClick={handlePrevSlide}
          className="absolute left-0 sm:left-2 md:left-4 lg:left-6 xl:left-8 2xl:left-10 top-1/2 transform -translate-y-1/2 
                   bg-white p-1 sm:p-2 md:p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700"
            strokeWidth={2}
          />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-0 sm:right-2 md:right-4 lg:right-6 xl:right-8 2xl:right-10 top-1/2 transform -translate-y-1/2 
                   bg-white p-1 sm:p-2 md:p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
          aria-label="Next slide"
        >
          <ChevronRight
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700"
            strokeWidth={2}
          />
        </button>
      </div>
    </div>
  );
};

TreatCarousel.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slides: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.number.isRequired,
        imageSrc: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onSlideClick: PropTypes.func.isRequired,
};

export default TreatCarousel;
