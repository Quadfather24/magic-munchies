import { useEffect, useRef, useMemo } from "react";
import PropTypes from "prop-types";

const BubbleBackground = ({ children }) => {
  const canvasRef = useRef(null);

  // Simplified color palette
  const baseColors = useMemo(
    () => ({
      primary: "rgba(255, 182, 161, 1)", // Soft coral
      secondary: "rgba(246,184,158, 0.9)", // Warm cream
      accent: "rgba(255, 182, 161, 1)", // Warm coral
      bubble: "rgba(255, 255, 255, 0.8)", // White for bubbles
    }),
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Create bubbles with simplified properties
    const bubbles = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      size: Math.random() * 0.3 + 0.5,
      speed: Math.random() * 0.1 + 0.1,
      opacity: Math.random() * 0.2 + 0.1,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradient background
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      gradient.addColorStop(0, baseColors.primary);
      gradient.addColorStop(0.5, baseColors.secondary);
      gradient.addColorStop(1, baseColors.accent);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw bubbles
      bubbles.forEach((bubble) => {
        // Simple upward movement
        bubble.y -= bubble.speed;

        // Draw bubble with enhanced gradient
        const gradient = ctx.createRadialGradient(
          bubble.x,
          bubble.y,
          0,
          bubble.x,
          bubble.y,
          bubble.size
        );
        gradient.addColorStop(
          0,
          `rgba(255, 255, 255, ${bubble.opacity * 1.2})`
        );
        gradient.addColorStop(0.6, `rgba(255, 255, 255, ${bubble.opacity})`);
        gradient.addColorStop(
          1,
          `rgba(255, 255, 255, ${bubble.opacity * 0.3})`
        );

        // Draw circular bubble
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Add subtle highlight
        ctx.beginPath();
        ctx.arc(
          bubble.x - bubble.size * 0.2,
          bubble.y - bubble.size * 0.2,
          bubble.size * 0.3,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity * 0.5})`;
        ctx.fill();

        // Reset bubble position
        if (bubble.y < -bubble.size * 2) {
          bubble.y = canvas.height + bubble.size;
          bubble.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [baseColors]);

  return (
    <div className="w-full">
      <div className="relative w-full min-h-screen">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 0 }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
};

BubbleBackground.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BubbleBackground;
