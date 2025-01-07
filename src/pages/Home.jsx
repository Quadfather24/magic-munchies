import { useRef } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

const landingPage = () => {
  const ref = useRef();

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Parallax pages={3} ref={ref}>
        {/* First Page */}
        <ParallaxLayer
          offset={0}
          speed={2.5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "2rem", color: "#333" }}>
            Layers can contain anything
          </p>
        </ParallaxLayer>

        {/* Second Page with Horizontal Scroll */}
        <ParallaxLayer
          offset={1}
          speed={-2}
          factor={1.5}
          horizontal
          style={{ backgroundColor: "#f0f0f0" }}
        >
          <div
            style={{
              display: "flex",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p style={{ fontSize: "2rem", color: "#333" }}>
              Horizontal Scrolling Layer
            </p>
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
          <p style={{ fontSize: "2rem", color: "#333" }}>I am a sticky layer</p>
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
        >
          <button
            onClick={() => ref.current.scrollTo(0)}
            style={{
              padding: "1rem 2rem",
              fontSize: "1rem",
              cursor: "pointer",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#007BFF",
              color: "#fff",
              zIndex: 20,
            }}
          >
            Scroll to top
          </button>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default landingPage;
