const images = [
  {
    id: 1,
    src: "https://via.placeholder.com/300x200?text=Image+1",
    alt: "Placeholder Image 1",
  },
  {
    id: 2,
    src: "https://via.placeholder.com/300x200?text=Image+2",
    alt: "Placeholder Image 2",
  },
  // ... more images
];

export default function Gallery() {
  return (
    <section className="min-h-screen py-10 bg-gray-50">
      <h2 className="text-3xl font-semibold text-center mb-8">Gallery</h2>
      <div className="mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.src}
            alt={img.alt}
            className="w-full h-auto object-cover rounded-lg shadow"
          />
        ))}
      </div>
    </section>
  );
}
