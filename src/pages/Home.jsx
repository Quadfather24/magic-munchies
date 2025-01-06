import { motion, useScroll, useTransform } from "framer-motion";

function LandingPage() {
  // Track vertical scroll position
  const { scrollY } = useScroll();

  // Image 1:
  //  At scroll=0,  off-screen left (x=-300)
  //  At scroll=500, center (x=0)
  //  At scroll=800, off-screen right (x=300)
  const firstImageX = useTransform(scrollY, [0, 500, 800], [-300, 0, 300]);

  // Image 2:
  //  At scroll=500, off-screen right (x=400)
  //  At scroll=1000, center (x=0)
  //  At scroll=1500, off-screen left (x=-400)
  const secondImageX = useTransform(scrollY, [500, 1000, 1500], [400, 0, -400]);

  return (
    <div
      className="
        min-h-[200vh]           /* Enough vertical space to scroll */
        bg-gradient-to-tr
        from-[#ffb6a1] via-[#fff4e6] to-[#f97c7c]
        overflow-x-hidden
      "
    >
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-3xl font-bold mb-4 drop-shadow-lg sm:text-5xl">
          Magic Munchies
        </h1>
        <p className="text-base text-center sm:text-xl">
          Scroll down to see the horizontal animations!
        </p>
      </section>

      {/* Image 1 Section */}
      <section className="relative h-screen flex items-center justify-center px-4">
        <motion.div
          style={{ x: firstImageX }}
          className="
            w-48 h-48           /* Mobile size */
            bg-white/80
            shadow-lg
            rounded-lg
            flex
            items-center
            justify-center
            sm:w-72 sm:h-72    /* Larger size on bigger screens */
          "
        >
          {/* Replace with your actual image */}
          <p className="text-gray-600 font-semibold text-center px-2">
            Placeholder for Image 1
          </p>
        </motion.div>
      </section>

      {/* Image 2 Section */}
      <section className="relative h-screen flex items-center justify-center px-4">
        <motion.div
          style={{ x: secondImageX }}
          className="
            w-48 h-48
            bg-white/80
            shadow-lg
            rounded-lg
            flex
            items-center
            justify-center
            sm:w-72 sm:h-72
          "
        >
          {/* Replace with your actual image */}
          <p className="text-gray-600 font-semibold text-center px-2">
            Placeholder for Image 2
          </p>
        </motion.div>
      </section>
    </div>
  );
}

export default LandingPage;
