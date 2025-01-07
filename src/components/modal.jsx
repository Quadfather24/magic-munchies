import PropTypes from "prop-types";

const ImageModal = ({ isOpen, onClose, src, alt, description }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg p-4 max-w-3xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className=" absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-contain rounded mb-4"
        />
        <h2 className="text-xl font-bold mb-2">{alt}</h2>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  description: PropTypes.string,
};

ImageModal.defaultProps = {
  description: "",
};

export default ImageModal;
