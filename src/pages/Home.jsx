import { useRef, useEffect } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useSpring, animated } from "@react-spring/web";
import landingpage1 from "../assets/images/parralax/landingPage1.svg";
import landingpage2 from "../assets/images/parralax/landingPage2.svg";
import landingpage3 from "../assets/images/parralax/landingPage3.svg";
import landingpage4 from "../assets/images/parralax/landingPage4.svg";

const SectionHeader = ({ title, subtitle }) => (
  <div className="text-center space-y-4">
    <h2 className="text-3xl md:text-5xl text-white font-bold">{title}</h2>
    <p className="text-xl text-white opacity-90">{subtitle}</p>
  </div>
);

const FloatingButton = ({ onClick, index }) => (
  <button
    aria-label={`Navigate to section ${index + 1}`}
    onClick={onClick}
    className="w-4 h-4 rounded-full bg-white opacity-50 hover:opacity-100 transition-opacity shadow-md"
  />
);

const LandingPage = () => {
  const ref = useRef();

  // Animation Hooks
  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 9000 },
  });

  const float = useSpring({
    from: { transform: "translateY(0px)" },
    to: async (next) => {
      while (true) {
        await next({ transform: "translateY(-10px)" });
        await next({ transform: "translateY(0px)" });
      }
    },
    config: { mass: 1, tension: 180, friction: 12 },
    loop: true,
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="relative w-screen h-dvh overflow-hidden z-20">
      <img
        src={landingpage2}
        className="absolute top-0 left-0 w-full h-full object-cover z-[-10]" // Negative z-index to place it behind
        alt="Background"
      />

      <Parallax pages={3} ref={ref}>
        {/* Hero Section */}
        <ParallaxLayer
          offset={0}
          speed={0.5}
          factor={1}
          className="flex flex-col justify-center items-center relative overflow-hidden max-w-none"
        >
          <animated.div className="w-full h-full flex justify-center items-center relative">
            <div className="relative w-full h-full mx-auto">
              <img
                src={landingpage1}
                alt="Hero Background"
                className="w-full h-full object-cover lg:object-contain max-h-dvh bg-yellow-300"
              />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end items-center  z-10">
              <animated.h1
                style={float}
                className="text-4xl md:text-6xl lg:text-7xl text-black font-bold"
              >
                Welcome
              </animated.h1>
              <animated.p className="text-xl md:text-2xl text-magicPink max-wA-2xl text-center px-4">
                Scroll to explore More
              </animated.p>
            </div>
          </animated.div>
        </ParallaxLayer>

        {/* Middle Section */}
        <ParallaxLayer
          offset={1}
          speed={0.8}
          className="flex flex-col justify-center items-center max-w-none bg-magicPink"
          style={{
            backgroundImage: `url(${landingpage3})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        ></ParallaxLayer>

        {/* Bottom Section */}
        <ParallaxLayer
          offset={2}
          speed={1.2}
          className="flex flex-col justify-center items-center max-w-none bg-magicPurple"
        >
          <animated.div className="w-full h-full flex justify-center items-center relative">
            <div className="relative w-full h-full mx-auto">
              <img
                src={landingpage4}
                alt="menu Background"
                className="w-full h-full object-cover lg:object-contain max-h-dvh bg-magicPurple"
              />
            </div>
          </animated.div>
        </ParallaxLayer>

        {/* Navigation Dots */}
        <ParallaxLayer sticky={{ start: 0, end: 2 }}>
          {/* Navigation Buttons */}
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default LandingPage;
