import { useRef } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import landImage1 from "../assets/images/parralax/landImage1.jpg";
import sprinkles from "../assets/images/parralax/sprinkles.webp";

const LandingPage = () => {
  const ref = useRef();

  return (
    <div style={{ height: "100vh", width: "100vh", overflow: "hidden" }}>
      <Parallax pages={3} ref={ref}>
        {/* Middle Page Content */}
        <ParallaxLayer
          offset={1}
          speed={0}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: `url(${landImage1})`, // Use the imported module here

            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1>Middle of the Page</h1>
        </ParallaxLayer>

        {/* Top Layer - Moves upward on scroll */}
        <ParallaxLayer
          offset={0.5} // Starting near the middle
          speed={-1.5} // Negative speed for upward movement
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents: "none", // Ensure layer doesn't block scroll
            // backgroundImage: `url(${})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div style={{ padding: "2rem", background: "#ffdead" }}>
            <p>Top Layer Content</p>
          </div>
        </ParallaxLayer>

        {/* Bottom Layer - Moves downward on scroll */}
        <ParallaxLayer
          offset={0.5} // Starting near the middle
          speed={1.5} // Positive speed for downward movement
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents: "none",
          }}
        >
          <div style={{ padding: "2rem", background: "#add8e6" }}>
            <p>Bottom Layer Content</p>
          </div>
        </ParallaxLayer>

        {/* First Page */}
        <ParallaxLayer
          offset={0}
          speed={2.5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: `url(${landImage1})`, // Use the imported module here

            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></ParallaxLayer>

        {/* Second Page */}
        <ParallaxLayer
          offset={1}
          speed={-2}
          factor={1.5}
          style={{ backgroundColor: "#f0f0f0" }}
        >
          <div
            className="responsive-container"
            style={{
              display: "flex",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage: `url(${sprinkles})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <p className="parallax-text">Vertical Scrolling Layer</p>
          </div>
        </ParallaxLayer>

        {/* Sticky Layer */}
        <ParallaxLayer
          sticky={{ start: 1, end: 2 }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <p className="parallax-text">I am a sticky layer</p>
        </ParallaxLayer>

        {/* Third Page */}
        <ParallaxLayer
          offset={2}
          speed={1}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default LandingPage;
