import { useState, useEffect } from "react";

// Hook for tracking component performance
export const usePerformanceTracking = (componentName) => {
  useEffect(() => {
    const markStart = `${componentName}-render-start`;
    const markEnd = `${componentName}-render-end`;

    performance.mark(markStart);

    return () => {
      performance.mark(markEnd);
      performance.measure(
        `${componentName}-render-duration`,
        markStart,
        markEnd
      );
    };
  });
};

// Hook for progressive image loading
export const useProgressiveImage = (src) => {
  const [sourceLoaded, setSourceLoaded] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setSourceLoaded(src);
    img.onerror = () => setError(true);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { sourceLoaded, error };
};

// Hook for image preloading
export const useImagePreload = (currentIndex, slides) => {
  useEffect(() => {
    const imageCache = new Set();
    const preloadQueue = [];

    const preloadImage = (src) => {
      if (imageCache.has(src)) return;

      const img = new Image();
      img.src = src;
      imageCache.add(src);
      preloadQueue.push(img);

      if (preloadQueue.length > 5) {
        const oldestImg = preloadQueue.shift();
        imageCache.delete(oldestImg.src);
      }
    };

    // Preload adjacent images
    const nextIndex = (currentIndex + 1) % slides.length;
    const prevIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;

    [nextIndex, prevIndex].forEach((index) => {
      preloadImage(slides[index].imageSrc);
    });

    return () => {
      imageCache.clear();
      preloadQueue.length = 0;
    };
  }, [currentIndex, slides]);
};
