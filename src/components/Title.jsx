import PropTypes from "prop-types";

const Title = ({ category }) => {
  return (
    <div className="w-full">
      {/* Google Fonts import */}
      <link
        href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap"
        rel="stylesheet"
      />

      <style>
        {`
          .title-wrapper {
  --stripe-step: 0.75vmax;
            --stripe-offset: 0.25vmax;
            --delay: 4s;
            --duration: calc(var(--delay) * 90);
            position: relative;
            width: 100%;
            font-family: 'Fredoka One', cursive;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 1rem 0;
          }

          .title-content {
            position: relative;
            display: inline-block;
          }

          .title-layer {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            /* Repeating diagonal stripes as the mask pattern */
            -webkit-mask-image: repeating-linear-gradient(
              -45deg,
              black 0,
              black var(--stripe-step),
              transparent 0,
              transparent calc(var(--stripe-step) * 4.75)
            );
            mask-image: repeating-linear-gradient(
              -45deg,
              black 0,
              black var(--stripe-step),
              transparent 0,
              transparent calc(var(--stripe-step) * 2)
            );
            -webkit-mask-size: 400% 400%;
            mask-size: 400% 400%;
            /* Slower duration for the sliding mask */
            animation: maskSlide var(--duration) ease-out infinite;
          }

          .title-text {
            position: relative;
            color: Black;
            display: block;
            text-shadow: 1px 1px 0 rgba(0,0,0,0.1);
          }

          /* Tomato layer offset */
          .title-layer-1 {
            color: Black;
            transform: translate(var(--stripe-offset), var(--stripe-offset));
            /* Adjusted delay for the first offset layer */
            animation-delay: calc(var(--delay) * -3.5);
          }

          /* Turquoise layer offset */
          .title-layer-2 {
            color: Black;
            transform: translate(
              calc(var(--stripe-offset) * 0.5),
              calc(var(--stripe-offset) * 0.5)
            );
            /* Adjusted delay for the second offset layer */
            animation-delay: calc(var(--delay) * -2.5);
          }

          /* Keyframes for the sliding diagonal mask */
          @keyframes maskSlide {
            0% {
              -webkit-mask-position: 0% 0%;
              mask-position: 0% 0%;
              33% {
              -webkit-mask-position: var(--stripe-offset) var(--stripe-offset);
              }
              66% {
              -webkit-mask-position: var(--stripe-offset) var(--stripe-offset);
              }
              
            }
            100% {
              -webkit-mask-position: -200% -200%;
              mask-position: -200% -200%;
            }
          }
        `}
      </style>

      <div className="title-wrapper">
        <div className="title-content">
          {/* Base text in gold */}
          <span className="title-text text-5xl sm:text-5xl md:text-6xl lg:text-7xl">
            {category.title}
          </span>

          {/* First offset layer (tomato) */}
          <span className="title-layer title-layer-1 text-5xl sm:text-5xl md:text-6xl lg:text-7xl">
            {category.title}
          </span>

          {/* Second offset layer (turquoise) */}
          <span className="title-layer title-layer-2 text-5xl sm:text-5xl md:text-6xl lg:text-7xl">
            {category.title}
          </span>
        </div>
      </div>
    </div>
  );
};

Title.propTypes = {
  category: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Title;
