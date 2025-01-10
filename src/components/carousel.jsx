// src/components/carousel.jsx
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
        <img
          src={slide.imageSrc}
          alt={slide.title}
          className="w-full h-auto md:h-96 object-cover rounded-lg shadow-md shadow-gray-900 "
          loading="lazy"
        />
      </div>
    ),
  }));

  return (
    <div className="relative flex flex-col flex-1 h-auto ">
      <div>
        <h2 className="text-3xl relative font-semibold mt-16 text-center">
          <span className="relative inline-block">
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-magicPink via-magicPeach to-magicPink bg-[length:200%_100%] animate-gradient"></span>
            <span className="relative p-6 rounded-full">{category.title}</span>
          </span>
        </h2>
      </div>
      <div className="relative">
        <div className="h-[52vh]">
          <Carousel
            slides={carouselSlides}
            goToSlide={currentIndex}
            offsetRadius={2}
            animationConfig={config.gentle}
            showNavigation={false}
          />
        </div>

        {/* Navigation buttons */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-8 lg:left-16 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
          aria-label={`Previous ${category.title} slide`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
          className="absolute right-8 lg:right-16 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
          aria-label={`Next ${category.title} slide`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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

// Define prop types
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
