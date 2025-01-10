import ReactDOM from "react-dom";

const StickyButton = () => {
  return ReactDOM.createPortal(
    <div
      style={{
        position: "relative",
        bottom: "50%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
      }}
    ></div>,
    document.body // Render this directly in the <body>
  );
};

export default StickyButton;
