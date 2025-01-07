import { useState } from "react";
import TreatCarousel from "../components/carousel";
import ImageModal from "../components/modal";
import { treatCategories } from "../data/treatData";

export default function Menu() {
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSlideClick = (slide) => {
    setSelectedSlide(slide);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedSlide(null);
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-magic-gradient">
      {treatCategories.map((category) => (
        <TreatCarousel
          key={category.id}
          category={category} // Pass the category object
          onSlideClick={handleSlideClick} // Pass the click handler
        />
      ))}
      {selectedSlide && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          src={selectedSlide.imageSrc}
          alt={selectedSlide.title}
          description={selectedSlide.description}
        />
      )}
    </div>
  );
}
