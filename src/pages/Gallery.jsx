import { useState } from "react";
import TreatCarousel from "../components/carousel";
import TreatModal from "../components/modal";
import { treatCategories } from "../data/treatData";
import BubbleBackground from "../components/BubbleBackground";

export default function Menu() {
  // Track both the selected slide and its category
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSlideClick = (slide, category) => {
    // Find the index of the clicked slide in the category
    const slideIndex = category.slides.findIndex((s) => s.key === slide.key);

    setSelectedSlide(slide);
    setCurrentCategory(category);
    setCurrentSlideIndex(slideIndex);
    setModalOpen(true);
  };

  const handleNextSlide = () => {
    if (!currentCategory) return;

    // Calculate the next index with wraparound
    const nextIndex = (currentSlideIndex + 1) % currentCategory.slides.length;
    setCurrentSlideIndex(nextIndex);
    setSelectedSlide(currentCategory.slides[nextIndex]);
  };

  const handlePreviousSlide = () => {
    if (!currentCategory) return;

    // Calculate the previous index with wraparound
    const prevIndex =
      currentSlideIndex === 0
        ? currentCategory.slides.length - 1
        : currentSlideIndex - 1;
    setCurrentSlideIndex(prevIndex);
    setSelectedSlide(currentCategory.slides[prevIndex]);
  };

  const closeModal = () => {
    setSelectedSlide(null);
    setCurrentCategory(null);
    setCurrentSlideIndex(0);
    setModalOpen(false);
  };

  return (
    <BubbleBackground>
      {treatCategories.map((category) => (
        <TreatCarousel
          key={category.id}
          category={category}
          onSlideClick={(slide) => handleSlideClick(slide, category)}
        />
      ))}
      {selectedSlide && (
        <TreatModal
          isOpen={isModalOpen}
          onClose={closeModal}
          slide={selectedSlide}
          onNext={handleNextSlide}
          onPrevious={handlePreviousSlide}
        />
      )}
    </BubbleBackground>
  );
}
