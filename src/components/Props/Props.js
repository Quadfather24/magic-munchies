import PropTypes from "prop-types";

// Base shape for a slide item
export const slideImagePropType = PropTypes.shape({
  key: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  altText: PropTypes.string,
});

// Props for the main carousel component
export const carouselProps = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slides: PropTypes.arrayOf(slideImagePropType).isRequired,
  }).isRequired,
  onSlideClick: PropTypes.func.isRequired,
  initialIndex: PropTypes.number,
  autoPlay: PropTypes.bool,
  autoPlayInterval: PropTypes.number,
  showDots: PropTypes.bool,
  showArrows: PropTypes.bool,
  className: PropTypes.string,
};

// Default values for the carousel
export const defaultCarouselProps = {
  initialIndex: 0,
  autoPlay: false,
  autoPlayInterval: 5000,
  showDots: true,
  showArrows: true,
  className: "",
};
