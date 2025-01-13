import { useState, useCallback, memo, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Carousel from "react-spring-3d-carousel";
import { config } from "@react-spring/web";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "animate.css";
import { useSwipeable } from "react-swipeable";
import {
  carouselProps,
  defaultCarouselProps,
  slideImagePropType,
} from "./Props/Props";
import {
  usePerformanceTracking,
  useProgressiveImage,
  useImagePreload,
} from "./Props/Hooks";

// Memoized navigation button component
const CarouselButton = memo(
  ({ direction, onClick, children, disabled = false }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`absolute ${
        direction === "left"
          ? "left-0 sm:left-2 md:left-4 lg:left-6 xl:left-8 2xl:left-10"
          : "right-0 sm:right-2 md:right-4 lg:right-6 xl:right-8 2xl:right-10"
      } top-1/2 transform -translate-y-1/2 
    bg-white p-1 sm:p-2 md:p-3 rounded-full shadow-lg 
    ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}
    transition-all duration-300 z-10
    focus:outline-none`}
      aria-label={`${direction === "left" ? "Previous" : "Next"} slide`}
    >
      {children}
    </button>
  )
);

CarouselButton.propTypes = {
  direction: PropTypes.oneOf(["left", "right"]).isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

CarouselButton.displayName = "CarouselButton";

// Optimized image component with animated title
const CarouselImage = memo(({ slide, isActive, onClick }) => {
  const { sourceLoaded, error } = useProgressiveImage(slide.imageSrc);
  const imgRef = useRef(null);
  const [showUnderline, setShowUnderline] = useState(false);

  useEffect(() => {
    if (isActive) {
      setShowUnderline(false);
      const timer = setTimeout(() => {
        setShowUnderline(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShowUnderline(false);
    }
  }, [isActive]);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <span className="text-gray-500">Failed to load image</span>
      </div>
    );
  }

  return (
    <div
      onClick={() => onClick(slide)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick(slide);
        }
      }}
      className="cursor-pointer focus:outline-none w-full h-full "
    >
      <div className="relative w-full h-full max-w-screen-2xl mx-auto">
        <div className="flex flex-col items-center h-full">
          {/* Title container with animated underline */}
          <div className=" justify-center sm:mb-10 md:mb-12 text-center w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 mt-4">
            <h3 className=" text-base text-nowrap sm:text-lg md:text-xl lg:text-2xl font-medium mb-3 sm:mb-3">
              {slide.title}
            </h3>
            <div
              className={`h-0.5  bg-magicTeal transition-all duration-500 ease-out mx-auto
                ${showUnderline ? "w-10/12 m-3 sm:w-4/5 md:w-3/4" : "w-0"}
              `}
            />
          </div>

          <div className="relative w-full h-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12">
            {!sourceLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
            )}
            <img
              ref={imgRef}
              src={slide.imageSrc}
              alt={slide.title}
              className={`w-full h-full object-contain rounded-lg 
                         transition-all duration-300 ease-out
                         ${sourceLoaded ? "opacity-100" : "opacity-0"}`}
              loading={isActive ? "eager" : "lazy"}
              decoding="async"
              sizes="(max-width: 640px) 100vw,
                     (max-width: 768px) 91.666667%,
                     (max-width: 1024px) 83.333333%,
                     (max-width: 1280px) 75%,
                     66.666667%"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

CarouselImage.propTypes = {
  slide: slideImagePropType.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

CarouselImage.displayName = "CarouselImage";

// Main Carousel Component
const TreatCarousel = ({
  category,
  onSlideClick,
  initialIndex = defaultCarouselProps.initialIndex,
  autoPlay = defaultCarouselProps.autoPlay,
  autoPlayInterval = defaultCarouselProps.autoPlayInterval,
  showArrows = defaultCarouselProps.showArrows,
  className = defaultCarouselProps.className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoPlayTimeoutRef = useRef(null);

  // Use custom hooks
  usePerformanceTracking("TreatCarousel");
  useImagePreload(currentIndex, category.slides);

  // Auto-play functionality
  const handleAutoPlay = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % category.slides.length);
    setTimeout(() => setIsAnimating(false), 300);
  }, [category.slides.length, isAnimating]);

  useEffect(() => {
    if (autoPlay && !isAnimating) {
      autoPlayTimeoutRef.current = setTimeout(() => {
        handleAutoPlay();
      }, autoPlayInterval);

      return () => {
        if (autoPlayTimeoutRef.current) {
          clearTimeout(autoPlayTimeoutRef.current);
        }
      };
    }
  }, [autoPlay, isAnimating, autoPlayInterval, handleAutoPlay]);

  // Navigation handlers
  const handleNextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % category.slides.length);
    setTimeout(() => setIsAnimating(false), 300);
  }, [category.slides.length, isAnimating]);

  const handlePrevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? category.slides.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 300);
  }, [category.slides.length, isAnimating]);

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNextSlide,
    onSwipedRight: handlePrevSlide,
    preventDefaultTouchmoveEvent: true,
    trackMouse: false,
    delta: 50,
    swipeDuration: 500,
    touchEventOptions: { passive: true },
  });

  const carouselSlides = category.slides.map((slide, index) => ({
    key: slide.key,
    content: (
      <CarouselImage
        slide={slide}
        isActive={index === currentIndex}
        onClick={onSlideClick}
      />
    ),
  }));

  return (
    <div
      className={`bg-magic-gradient flex flex-col w-full min-h-screen max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 ${className}`}
    >
      <div
        className="py-12 sm:py-16 md:py-20 animate__animated animate__rubberBand
        animate__delay-1s  
        animate__repeat-3
              

      "
      >
        <h2 className="text-4xl sm:text-2xl md:text-3xl font-semibold text-center text-magicPink">
          {category.title}
        </h2>
      </div>

      <div
        className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96"
        {...swipeHandlers}
      >
        <div aria-live="polite" className="sr-only">
          Showing slide {currentIndex + 1} of {category.slides.length}
        </div>

        <Carousel
          slides={carouselSlides}
          goToSlide={currentIndex}
          offsetRadius={2}
          animationConfig={config.gentle}
          showNavigation={false}
        />

        {showArrows && (
          <>
            <CarouselButton
              direction="left"
              onClick={handlePrevSlide}
              disabled={isAnimating}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700" />
            </CarouselButton>

            <CarouselButton
              direction="right"
              onClick={handleNextSlide}
              disabled={isAnimating}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700" />
            </CarouselButton>
          </>
        )}
      </div>
    </div>
  );
};

TreatCarousel.propTypes = carouselProps;
TreatCarousel.defaultProps = defaultCarouselProps;
TreatCarousel.displayName = "TreatCarousel";

export default memo(TreatCarousel);
