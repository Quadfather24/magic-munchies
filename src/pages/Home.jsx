import { useRef, useEffect, useState } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { animated } from "@react-spring/web";
import ParticleEffect from "../components/ParticleEffect";
import PropTypes from "prop-types";
import "animate.css";
import landingpage1 from "../assets/images/parralax/landingPage1.svg";
import landingpage2 from "../assets/images/parralax/landingPage2.svg";
import landingpage3 from "../assets/images/parralax/landingPage3.svg";
import landingpage4 from "../assets/images/parralax/landingPage4.svg";

const ParallaxSection = ({ offset, speed, content, style, className = "" }) => (
  <ParallaxLayer
    offset={offset}
    speed={speed}
    style={style}
    className={`justify-center items-center ${className}`}
  >
    {content}
  </ParallaxLayer>
);

ParallaxSection.propTypes = {
  offset: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  content: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
};

ParallaxSection.defaultProps = {
  content: null,
  style: {},
  className: "",
};

const LandingPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showDelayedButton, setShowDelayedButton] = useState(false);
  const ref = useRef();

  // Set up interaction detection
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleInteraction = () => setHasInteracted(true);

    document.addEventListener("touchstart", handleInteraction, { once: true });
    document.addEventListener("wheel", handleInteraction, { once: true });
    document.addEventListener("mousedown", handleInteraction, { once: true });

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("wheel", handleInteraction);
      document.removeEventListener("mousedown", handleInteraction);
    };
  }, []);

  // Handle URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get("section");

    if (section === "gallery") {
      ref.current?.scrollTo(2);
      setCurrentPage(2);
      setHasInteracted(true);
    }
  }, []);

  // Navigation helper with smooth scrolling
  const handleScroll = (page) => {
    ref.current?.scrollTo(page);
    setCurrentPage(page);
  };

  return (
    <div className="relative w-screen h-screen pointer-events-none">
      {/* Background image */}
      <div className="absolute w-full h-dvh">
        <img
          src={landingpage2}
          className="w-full h-full object-cover opacity-45"
          alt="Landing page background"
          loading="lazy"
        />
      </div>

      {/* Parallax container with smooth scrolling */}
      <div className="absolute inset-0 z-30 pointer-events-auto">
        <Parallax pages={3} ref={ref}>
          {/* First section */}
          <ParallaxSection
            offset={0}
            speed={0.8}
            content={
              <animated.div className="w-full h-full flex justify-center items-center relative">
                <div className="relative w-full h-full mx-auto">
                  <img
                    src={landingpage1}
                    alt="Hero background with welcome text"
                    className="w-full h-full object-cover 2xl:object-contain max-h-dvh bg-yellow-300"
                  />
                </div>
                <div className="absolute top-1/2 right-0 md:right-[2rem] lg:right-[5rem] xl:right-[10rem] 2xl:right-[10rem] translate-y-[14rem] md:translate-y-[18rem] pr-1">
                  <div
                    className={
                      hasInteracted
                        ? "animate__animated animate__backOutRight animate__slower"
                        : ""
                    }
                  >
                    <animated.p className="text-[.75rem] md:text-xl lg:text-4xl text-black max-w-2xl text-center animate__animated animate__fadeInDown animate__infinite animate__slow">
                      Scroll to explore more
                    </animated.p>
                  </div>
                </div>
              </animated.div>
            }
          />

          {/* Middle section */}
          <ParallaxSection
            offset={1}
            speed={0.5}
            style={{
              backgroundImage: `url(${landingpage3})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
            }}
            className="bg-magicHot"
          />

          {/* Bottom section */}
          <ParallaxSection
            offset={2}
            speed={1}
            content={
              <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-auto">
                <img
                  src={landingpage4}
                  alt="Menu background"
                  className="w-full h-full object-contain max-h-dvh bg-magicPurple"
                  loading="lazy"
                />
              </div>
            }
            className="bg-magicPurple"
          />

          {/* Navigation dots */}
          <ParallaxLayer
            sticky={{ start: 0, end: 2 }}
            className="z-50 pointer-events-auto"
          >
            <div className="absolute -right-2 top-7 rotate-90 pointer-events-auto">
              {[0, 1, 2].map((page) => (
                <button
                  key={page}
                  onClick={() => handleScroll(page)}
                  className={`w-4 h-4 rounded-full mx-1 ${
                    currentPage === page ? "bg-magicTeal" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </ParallaxLayer>
        </Parallax>
      </div>

      {/* Particle effect */}
      <div className="absolute inset-0 z-20">
        <ParticleEffect />
      </div>
    </div>
  );
};

export default LandingPage;
