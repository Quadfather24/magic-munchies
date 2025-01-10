import { useState } from "react";
import PropTypes from "prop-types";
import Carousel from "react-spring-3d-carousel";
import { config } from "@react-spring/web";

const TreatCarousel = ({ category, onSlideClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % category.slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? category.slides.length - 1 : prevIndex - 1
    );
  };

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
        className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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

      <div className="relative w-full">
        <div className="h-64 sm:h-96 md:h-112 lg:h-128 px-4 sm:px-8 md:px-16 lg:px-24">
          <Carousel
            slides={carouselSlides}
            goToSlide={currentIndex}
            offsetRadius={2}
            animationConfig={config.gentle}
            showNavigation={false}
          />
        </div>

        {/* Navigation buttons - Responsive positioning and sizing */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-2 sm:left-4 md:left-8 lg:left-12 top-1/2 transform -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
          aria-label={`Previous ${category.title} slide`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-2 sm:right-4 md:right-8 lg:right-12 top-1/2 transform -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
          aria-label={`Next ${category.title} slide`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
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
