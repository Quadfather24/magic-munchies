import { useRef, useEffect, useState } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { animated } from "@react-spring/web";
import { Link } from "react-router-dom";
import ParticleEffect from "../components/ParticleEffect";
import PropTypes from "prop-types";
import "animate.css";
import landingpage1 from "../assets/images/parralax/landingPage1.svg";
import landingpage2 from "../assets/images/parralax/landingPage2.svg";
import landingpage3 from "../assets/images/parralax/landingPage3.svg";
import landingpage4 from "../assets/images/parralax/landingPage4.svg";

// ParallaxSection component definition
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

// Main LandingPage component
const LandingPage = () => {
  // State and refs
  const [currentPage, setCurrentPage] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isFullyOnSecondPage, setIsFullyOnSecondPage] = useState(false);
  const ref = useRef();

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

  // Check URL parameters on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get("section");

    if (section === "gallery") {
      // Scroll to the last page right away
      ref.current?.scrollTo(2);
      setCurrentPage(2);
      setHasInteracted(true);
    }
  }, []);

  // (Optional) Keep if you still need to store "section=gallery" in the URL
  const navigateToGallery = (e) => {
    const currentURL = new URL(window.location.href);
    currentURL.searchParams.set("section", "gallery");
    window.history.replaceState({}, "", currentURL);
  };

  // (Optional) Keep if you need page offset detection
  const handleParallaxScroll = (offset) => {
    const page = Math.round(offset);
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const container = ref.current.container.current;
      if (!container) return;

      // 1) Figure out current page
      const scrollPercentage =
        container.scrollTop / (container.scrollHeight - container.clientHeight);
      const page = Math.round(scrollPercentage * 2);
      if (page !== currentPage) {
        setCurrentPage(page);
      }

      // 2) Are we fully scrolled to bottom?
      const scrolled = container.scrollTop + container.clientHeight;
      const fullHeight = container.scrollHeight - 1;
      setIsFullyOnSecondPage(scrolled >= fullHeight);
    };

    const container = ref.current?.container.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [currentPage]);

  return (
    <div className="relative w-screen h-screen pointer-events-none">
      {/* Background Image */}
      <div className="absolute w-full">
        <img
          src={landingpage2}
          className="w-full h-full object-cover opacity-45"
          alt="Landing page background"
          loading="lazy"
        />
      </div>

      {/* Parallax Container */}
      <div className="absolute inset-0 z-30 pointer-events-auto">
        <Parallax
          pages={3}
          ref={ref}
          onScroll={handleParallaxScroll}
          className="relative"
          config={{ tension: 50, friction: 20 }} // Adds for smoother scrolling
        >
          {/* Top Section */}
          <ParallaxSection
            offset={0}
            speed={0.5}
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

          {/* Bottom section*/}
          <ParallaxSection
            offset={2}
            speed={0.1}
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
            <div className="absolute -right-2 top-7 rotate-90">
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

      {/* Particle effect stays above background but below content */}
      <div className="absolute inset-0 z-20">
        <ParticleEffect />
      </div>

      {/* Standalone button container */}
      <div
        className="pointer-events-auto fixed left-1/2 bottom-32 -translate-x-1/2 z-[999]"
        style={{
          opacity: isFullyOnSecondPage ? 1 : 0,
          pointerEvents: isFullyOnSecondPage ? "auto" : "none",
          transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
        }}
      >
        <Link
          to="/gallery"
          onClick={navigateToGallery}
          className="absolute px-8 py-4 bg-magicTeal text-white rounded-lg
               hover:bg-opacity-90 transition-all duration-300
               shadow-lg hover:shadow-xl text-lg font-medium"
        >
          Visit Gallery
        </Link>
      </div>

      {/* Debug overlay to help us see what's happening */}
      <div className="fixed top-4 left-4 z-[1000] bg-black bg-opacity-50 text-white p-2 rounded">
        Page: {currentPage}
      </div>
    </div>
  );
};

export default LandingPage;
