import { useRef, useEffect } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useSpring, animated } from "@react-spring/web";

const ContactPage = () => {
  const ref = useRef();

  // Floating animation for elements
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
      <Parallax pages={4} ref={ref}>
        {/* Hero Section */}
        <ParallaxLayer
          offset={0}
          speed={0.5}
          factor={1}
          className="flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600"
        >
          <animated.div className="text-center">
            <animated.h1
              style={float}
              className="text-4xl md:text-6xl text-white font-bold"
            >
              Let's Connect
            </animated.h1>
            <p className="text-white text-lg mt-4">Scroll down to explore</p>
          </animated.div>
        </ParallaxLayer>

        {/* Facebook Section */}
        <ParallaxLayer
          offset={1}
          speed={0.6}
          factor={1}
          className="flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 to-cyan-500"
        >
          <div className="text-center max-w-xl">
            {/* <img
              src={}
              alt="Facebook"
              className="w-40 h-40 mb-6 mx-auto animate-float"
            /> */}
            <h2 className="text-3xl font-bold text-white">
              Connect on Facebook
            </h2>
            <p className="text-white mt-4">
              Join our community for updates and special offers!
            </p>
            <a
              href="#"
              className="mt-4 px-6 py-3 bg-white text-blue-600 rounded-lg shadow hover:bg-gray-100 transition"
            >
              Visit Our Page
            </a>
          </div>
        </ParallaxLayer>

        {/* Phone Section */}
        <ParallaxLayer
          offset={2}
          speed={0.8}
          factor={1}
          className="flex flex-col justify-center items-center bg-gradient-to-br from-green-500 to-emerald-600"
        >
          {/* Email */}
          <div className="flex items-center gap-4">
            <span className="text-yellow-400 text-2xl">
              <i className="far fa-envelope"></i>
            </span>
            <a
              href="mailto:#"
              className="text-lg text-[#f97c7c] font-semibold hover:underline"
              placeholder="Enter your email address"
            >
              claudiastreats21@gmail.com
            </a>
          </div>
        </ParallaxLayer>

        {/* Phone Section */}
        <ParallaxLayer
          offset={3}
          speed={0.8}
          factor={1}
          className="flex flex-col justify-center items-center bg-gradient-to-br from-green-500 to-emerald-600"
        >
          <div className="text-center max-w-xl">
            {/* <img
              src={}
              alt="Phone"
              className="w-40 h-40 mb-6 mx-auto animate-float"
            /> */}
            <h2 className="text-3xl font-bold text-white">Call Us</h2>
            <p className="text-white mt-4">
              Need immediate assistance? We're just a call away!
            </p>
            <a
              href="tel:+13616522470"
              className="mt-4 px-6 py-3 bg-white text-green-600 rounded-lg shadow hover:bg-gray-100 transition"
            >
              +1 (361) 652-2470
            </a>
          </div>
        </ParallaxLayer>

        {/* Email Section */}
        <ParallaxLayer
          offset={4}
          speed={1.0}
          factor={1}
          className="flex flex-col justify-center items-center bg-gradient-to-br from-yellow-500 to-orange-500"
        >
          <div className="text-center max-w-xl">
            {/* <img
              src={}
              alt="Email"
              className="w-40 h-40 mb-6 mx-auto animate-float"
            /> */}
            <h2 className="text-3xl font-bold text-white">Email Us</h2>
            <p className="text-white mt-4">
              Have a question? Drop us a line anytime!
            </p>
            <a
              href="mailto:claudiastreats21@gmail.com"
              className="mt-4 px-6 py-3 bg-white text-yellow-600 rounded-lg shadow hover:bg-gray-100 transition"
            >
              claudiastreats21@gmail.com
            </a>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default ContactPage;
