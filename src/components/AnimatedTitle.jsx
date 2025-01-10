import { useState, useEffect } from "react";

const AnimatedTitle = ({ title, className }) => {
  const [showUnderline, setShowUnderline] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowUnderline(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Use refined class for the underline
  const underlineClass = `absolute bottom-0 left-0 h-0.5 bg-blue-500 transition-width duration-1000 ease-in-out ${
    showUnderline ? "w-full" : "w-0"
  }`;

  return (
    <h2 className={className}>
      <span className="relative inline-block">
        <span className="relative">{title}</span>
        <span className={underlineClass} aria-hidden="true" />
      </span>
    </h2>
  );
};

export default AnimatedTitle;
