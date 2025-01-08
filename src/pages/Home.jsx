import React, { useRef, useEffect } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useSpring, animated } from "@react-spring/web";
import landingpage1 from "../assets/images/parralax/landing-page1.svg";

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
    config: { duration: 1000 },
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
    <div className="h-screen w-screen overflow-hidden">
      <Parallax pages={3} ref={ref}>
        {/* Hero Section */}
        <ParallaxLayer
          offset={0}
          speed={0.5}
          factor={1}
          className="flex flex-col justify-center items-center relative overflow-hidden"
        >
          <animated.div
            style={fadeIn}
            className="w-full h-full flex justify-center items-center relative"
          >
            <div className="relative w-full h-full mx-auto">
              <img
                src={landingpage1}
                alt="Hero Background"
                className="w-full h-full object-cover"
                loading="lazy"
                style={{ maxHeight: "100vh" }}
              />
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-5 z-10">
              <animated.h1
                style={float}
                className="text-4xl md:text-6xl lg:text-7xl text-teal-400 font-bold mt-[503px]"
              >
                Welcome
              </animated.h1>
              <animated.p className="text-xl md:text-2xl text-teal-400 max-w-2xl text-center px-4">
                Scroll to explore our journey
              </animated.p>
            </div>
          </animated.div>
        </ParallaxLayer>

        {/* Middle Section */}
        <ParallaxLayer
          offset={1}
          speed={0.8}
          className="flex flex-col justify-center items-center"
          style={{
            background: "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)",
          }}
        >
          <div className="w-full max-w-6xl px-4 md:px-8">
            <SectionHeader
              title="Our Vision"
              subtitle="Transform your ideas into reality with our innovative solutions"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="space-y-6">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all">
                  Learn More
                </button>
              </div>
              <animated.div
                style={float}
                className="bg-white p-6 rounded-xl shadow-xl max-w-3xl mx-auto"
              >
                <img
                  src={landingpage1} // Replace with appropriate asset
                  alt="Features"
                  className="w-full h-auto rounded-lg object-contain"
                  loading="lazy"
                />
              </animated.div>
            </div>
          </div>
        </ParallaxLayer>

        {/* Bottom Section */}
        <ParallaxLayer
          offset={2}
          speed={1.2}
          className="flex flex-col justify-center items-center"
          style={{
            background: "linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)",
          }}
        >
          <div className="w-full max-w-4xl px-4 md:px-8">
            <SectionHeader
              title="Get in Touch"
              subtitle="Let's create something amazing together"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[1, 2, 3].map((i) => (
                <animated.div
                  key={i}
                  style={float}
                  className="bg-white p-6 rounded-xl shadow-xl hover:transform hover:scale-105 transition-all"
                >
                  <h3 className="text-xl font-semibold mb-4">Feature {i}</h3>
                  <p className="text-gray-600">
                    Discover how we can help you achieve your goals
                  </p>
                </animated.div>
              ))}
            </div>
          </div>
        </ParallaxLayer>

        {/* Floating Navigation Dots */}
        <ParallaxLayer
          sticky={{ start: 0, end: 2 }}
          className="hidden md:flex flex-col items-end justify-center pr-8"
        >
          <div className="space-y-4">
            {[0, 1, 2].map((i) => (
              <FloatingButton
                key={i}
                index={i}
                onClick={() => ref.current.scrollTo(i)}
              />
            ))}
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default LandingPage;
