import { useRef, useEffect } from "react";

const ParticleEffect = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const requestRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const particleCount = 300;
      const colors = [
        "#FFB6A1", // magicPeach
        "#F97C7C", // magicPink
        "#5CE0E6", // magicTeal
        "#FFD700", // Candy Yellow
        "#F84FFFE3", // magicPurple
      ];

      const shapes = ["circle", "star", "heart"]; // Add fun shapes

      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 2, // Float upward
        size: Math.random() * 6 + 4, // Larger size for playfulness
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * 360, // For shapes like stars or hearts
      }));
    };

    const drawHeart = (context, x, y, size) => {
      context.beginPath();
      context.moveTo(x, y + size / 4);
      context.arc(x - size / 4, y, size / 4, Math.PI, 0, true);
      context.arc(x + size / 4, y, size / 4, Math.PI, 0, true);
      context.lineTo(x, y + size);
      context.closePath();
      context.fill();
    };

    const drawStar = (context, x, y, size, rotation) => {
      context.save();
      context.translate(x, y);
      context.rotate((Math.PI / 180) * rotation);
      context.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI) / 5;
        const xPos = Math.cos(angle) * size;
        const yPos = Math.sin(angle) * size;
        context.lineTo(xPos, yPos);
      }
      context.closePath();
      context.fill();
      context.restore();
    };

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += 2; // Rotate shapes for a fun effect

        // Respawn particles when they float out of view
        if (particle.y < -10) {
          particle.y = canvas.height + 10;
          particle.x = Math.random() * canvas.width;
        }

        // Draw particle
        context.fillStyle = particle.color;
        if (particle.shape === "circle") {
          context.beginPath();
          context.arc(
            particle.x,
            particle.y,
            particle.size / 2,
            0,
            Math.PI * 2
          );
          context.fill();
        } else if (particle.shape === "heart") {
          drawHeart(context, particle.x, particle.y, particle.size);
        } else if (particle.shape === "star") {
          drawStar(
            context,
            particle.x,
            particle.y,
            particle.size / 2,
            particle.rotation
          );
        }
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    requestRef.current = requestAnimationFrame(animate);

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
  );
};

export default ParticleEffect;
