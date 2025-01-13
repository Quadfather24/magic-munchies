import { useRef, useEffect } from "react";

const DessertParticleEffect = () => {
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
      const particleCount = 200;
      // Dessert-themed colors: pastels and sweet colors
      const colors = [
        "#FFB5E8", // Cotton Candy Pink
        "#FF9CEE", // Bubblegum
        "#F6E7D8", // Vanilla
        "#B5DEFF", // Blueberry
        "#FFD9B7", // Caramel
        "#FFCCB6", // Peach
        "#FFC4DD", // Strawberry Ice Cream
      ];

      const shapes = ["cookie", "donut", "cupcake", "candy"];

      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -Math.random() * 1.5, // Gentle float upward
        size: Math.random() * 8 + 6, // Slightly larger for visibility
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * 360,
        wobble: 0, // For wobbling animation
        wobbleSpeed: Math.random() * 0.1 + 0.05,
      }));
    };

    const drawCookie = (context, x, y, size) => {
      context.beginPath();
      context.arc(x, y, size / 2, 0, Math.PI * 2);
      context.fill();
      // Add chocolate chips
      context.fillStyle = "#4A3728";
      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5;
        const chipX = x + Math.cos(angle) * (size / 4);
        const chipY = y + Math.sin(angle) * (size / 4);
        context.beginPath();
        context.arc(chipX, chipY, size / 8, 0, Math.PI * 2);
        context.fill();
      }
    };

    const drawDonut = (context, x, y, size) => {
      // Donut base
      context.beginPath();
      context.arc(x, y, size / 2, 0, Math.PI * 2);
      context.fill();
      // Donut hole
      context.fillStyle = "#FFFFFF";
      context.beginPath();
      context.arc(x, y, size / 4, 0, Math.PI * 2);
      context.fill();
      // Sprinkles
      const sprinkleColors = ["#FF69B4", "#FFD700", "#87CEEB", "#98FB98"];
      for (let i = 0; i < 6; i++) {
        context.fillStyle = sprinkleColors[i % sprinkleColors.length];
        const angle = (i * Math.PI * 2) / 6;
        const sprinkleX = x + Math.cos(angle) * (size / 3);
        const sprinkleY = y + Math.sin(angle) * (size / 3);
        context.save();
        context.translate(sprinkleX, sprinkleY);
        context.rotate(angle);
        context.fillRect(-size / 8, -size / 16, size / 4, size / 8);
        context.restore();
      }
    };

    const drawCupcake = (context, x, y, size, rotation) => {
      context.save();
      context.translate(x, y);
      context.rotate((rotation * Math.PI) / 180);

      // Frosting (top)
      context.beginPath();
      context.moveTo(-size / 2, 0);
      context.quadraticCurveTo(0, -size / 1.2, size / 2, 0);
      context.fill();

      // Base (bottom)
      context.fillStyle = "#DEB887";
      context.fillRect(-size / 2, 0, size, size / 2);

      context.restore();
    };

    const drawCandy = (context, x, y, size, rotation) => {
      context.save();
      context.translate(x, y);
      context.rotate((rotation * Math.PI) / 180);

      // Candy wrapper
      context.beginPath();
      context.ellipse(0, 0, size / 2, size / 4, 0, 0, Math.PI * 2);
      context.fill();

      // Wrapper ends
      context.beginPath();
      context.moveTo(-size / 2, 0);
      context.lineTo(-size / 1.2, -size / 4);
      context.lineTo(-size / 1.2, size / 4);
      context.closePath();
      context.fill();

      context.beginPath();
      context.moveTo(size / 2, 0);
      context.lineTo(size / 1.2, -size / 4);
      context.lineTo(size / 1.2, size / 4);
      context.closePath();
      context.fill();

      context.restore();
    };

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += 1;
        particle.wobble += particle.wobbleSpeed;

        // Add gentle wobble
        const wobbleX = Math.sin(particle.wobble) * 2;
        const finalX = particle.x + wobbleX;

        // Respawn particles
        if (particle.y < -10) {
          particle.y = canvas.height + 10;
          particle.x = Math.random() * canvas.width;
        }
        // Wrap horizontally
        if (finalX < -10) particle.x = canvas.width + 10;
        if (finalX > canvas.width + 10) particle.x = -10;

        context.fillStyle = particle.color;

        switch (particle.shape) {
          case "cookie":
            drawCookie(context, finalX, particle.y, particle.size);
            break;
          case "donut":
            drawDonut(context, finalX, particle.y, particle.size);
            break;
          case "cupcake":
            drawCupcake(
              context,
              finalX,
              particle.y,
              particle.size,
              particle.rotation
            );
            break;
          case "candy":
            drawCandy(
              context,
              finalX,
              particle.y,
              particle.size,
              particle.rotation
            );
            break;
          default:
            break;
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
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
    />
  );
};

export default DessertParticleEffect;
