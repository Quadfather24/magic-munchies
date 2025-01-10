import { useRef, useEffect, useState } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { animated } from "@react-spring/web";
import ParticleEffect from "../components/ParticleEffect";
import PropTypes from "prop-types"; // Import the prop-types library

import landingpage1 from "../assets/images/parralax/landingPage1.svg";
import landingpage2 from "../assets/images/parralax/landingPage2.svg";
import landingpage3 from "../assets/images/parralax/landingPage3.svg";
import landingpage4 from "../assets/images/parralax/landingPage4.svg";

const ParallaxSection = ({ offset, speed, content, style, className = "" }) => (
  <ParallaxLayer
    offset={offset}
    speed={speed}
    style={style}
    className={`flex justify-center items-center ${className}`}
  >
    {content}
  </ParallaxLayer>
);

// Add prop validation for ParallaxSection
ParallaxSection.propTypes = {
  offset: PropTypes.number.isRequired, // Ensure offset is a required number
  speed: PropTypes.number.isRequired, // Ensure speed is a required number
  content: PropTypes.node, // Content can be any valid React node
  style: PropTypes.object, // Optional style object for custom styling
  className: PropTypes.string, // Optional additional CSS classes
};

// Default props for optional fields
ParallaxSection.defaultProps = {
  content: null, // Default content to null if not provided
  style: {}, // Default to an empty object for style
  className: "", // Default to an empty string for className
};

const LandingPage = () => {
  const ref = useRef();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleScroll = (page) => {
    ref.current.scrollTo(page);
    setCurrentPage(page);
  };

  return (
    <div className="relative w-screen h-dvh overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-30">
        <img
          src={landingpage2}
          className="w-full h-full object-cover opacity-45"
          alt="Landing page background"
          loading="lazy"
        />
      </div>

      <div className="absolute inset-0 z-50">
        <Parallax pages={3} ref={ref}>
          {/* Hero Section */}
          <ParallaxSection
            offset={0}
            speed={0.5}
            content={
              <animated.div className="w-full h-full flex justify-center items-center relative">
                <div className="relative w-full h-full mx-auto">
                  <img
                    src={landingpage1}
                    alt="Hero background with welcome text"
                    className="w-full h-full object-cover  2xl:object-contain max-h-dvh bg-yellow-300"
                  />
                </div>
                <div className="absolute top-1/2 right-0 md:right-[4rem] xl:right-[14rem] 2xl:right-[28rem] translate-y-[14rem] md:translate-y-[18rem] pr-1">
                  <animated.p className="text-[.75rem] md:text-xl lg:text-4xl text-black max-w-2xl text-center animate__animated animate__fadeInDown animate__infinite animate__slow">
                    Scroll to explore more
                  </animated.p>
                </div>
                {/* <div className="absolute top-[33rem] sm:top-[53rem] right-12 translate-y-[9rem] pr-1 animate__animated animate__fadeInDown animate__infinite animate__slow">
                  <span className="text-black text-4xl">↓</span>
                </div> */}
              </animated.div>
            }
            className="relative overflow-hidden max-w-none"
          />

          {/* Middle Section */}
          <ParallaxSection
            offset={1}
            speed={0.8}
            style={{
              backgroundImage: `url(${landingpage3})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
            }}
            className="bg-magicHot"
          />

          {/* Bottom Section */}
          <ParallaxSection
            offset={2}
            speed={1.2}
            content={
              <animated.div className="w-full h-full flex justify-center items-center relative">
                <div className="relative w-full h-full mx-auto">
                  <img
                    src={landingpage4}
                    alt="Menu background"
                    className="w-full h-full object-contain max-h-dvh bg-magicPurple"
                    loading="lazy"
                  />
                </div>
              </animated.div>
            }
            className="bg-magicPurple"
          />

          {/* Navigation Dots */}
          <ParallaxLayer sticky={{ start: 0, end: 2 }}>
            <div className="absolute -right-2 top-7 z-50 rotate-90">
              {[0, 1, 2].map((page) => (
                <button
                  key={page}
                  onClick={() => handleScroll(page)}
                  className={`w-4 h-4 rounded-full ${
                    currentPage === page ? "bg-magicTeal" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </ParallaxLayer>
        </Parallax>
      </div>
      {/* Particle Effect */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="pointer-events-auto">
          <ParticleEffect />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
