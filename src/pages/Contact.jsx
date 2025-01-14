import { useEffect, useState } from "react";
import "animate.css";
import contact1 from "../assets/images/background/contact1.svg";
import contact from "../assets/images/background/contact.svg";

function ContactPage() {
  // State to track if images are loaded
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Preload images
    const imageUrls = [contact1, contact];
    let loadedImages = 0;

    // Create preload link tags
    const head = document.head;
    imageUrls.forEach((url) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = url;
      head.appendChild(link);
    });

    // Load images in memory
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedImages++;
        if (loadedImages === imageUrls.length) {
          setImagesLoaded(true);
        }
      };
    });

    // Intersection Observer setup
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "0px",
      }
    );

    // Observe slide elements
    const slideElements = document.querySelectorAll(".slide-element");
    slideElements.forEach((el) => observer.observe(el));

    // Cleanup
    return () => {
      observer.disconnect();
      // Remove preload links on unmount
      const links = document.head.querySelectorAll(
        'link[rel="preload"][as="image"]'
      );
      links.forEach((link) => link.remove());
    };
  }, []);

  // Apply loading state styles
  const containerStyle = {
    backgroundImage: `url(${contact1})`,
    opacity: imagesLoaded ? 1 : 0,
    transition: "opacity 0.3s ease-in",
  };

  const heroStyle = {
    backgroundImage: `url(${contact})`,
    opacity: imagesLoaded ? 1 : 0,
    transition: "opacity 0.3s ease-in",
  };

  return (
    <div
      className="min-h-screen w-full h-full mx-auto bg-cover bg-center bg-no-repeat overflow-x-hidden"
      style={containerStyle}
    >
      {/* Hero Section */}
      <div
        className="w-full h-screen flex items-center justify-center sticky top-0 z-10 bg-cover bg-center bg-no-repeat bg-magicTeal"
        style={heroStyle}
      >
        <div className="text-center mb-7">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text mb-4">
            Let's Connect
          </h1>
          <p className="text-black text-xl animate__animated animate__fadeInDown">
            Scroll down
          </p>
          <div className="animate__animated animate__fadeOutDown animate__infinite animate__slow">
            <span className="text-black text-4xl">↓</span>
          </div>
        </div>
      </div>

      <div className="relative z-20 px-4 py-12 space-y-32">
        {/* Facebook Section */}
        <div className="slide-element slide-left max-w-4xl mx-auto opacity-0 -translate-x-full transition-all duration-1000">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-8 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 hover:ring-2 hover:ring-white">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-blue-600 text-5xl">
                <i className="fab fa-facebook animate__animated animate__bounce animate__infinite"></i>
              </div>
              <h2 className="text-2xl font-bold text-white">
                Connect on Facebook
              </h2>
              <p className="text-white text-lg max-w-md text-center">
                Join our community for updates and special offers!
              </p>
              <a
                href="https://www.facebook.com/groups/265346302113024/?ref=share&mibextid=NSMWBT"
                className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 hover:ring-2 hover:ring-white"
              >
                Visit Our Page
              </a>
            </div>
          </div>
        </div>

        {/* Email Section */}
        <div className="slide-element slide-right max-w-4xl mx-auto opacity-0 translate-x-full transition-all duration-1000">
          <div className="bg-gradient-to-br from-magicTeal/20 to-slate-800/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 hover:ring-2 hover:ring-white">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-white text-5xl">
                <i className="far fa-envelope animate__animated animate__bounce animate__infinite"></i>
              </div>
              <h2 className="text-2xl font-bold text-white">Email Us</h2>
              <p className="text-white text-lg max-w-md text-center">
                Have a question? Drop us a line anytime!
              </p>
              <a
                href="mailto:claudiastreats21@gmail.com"
                className="mt-2 px-6 py-2 bg text-white rounded-full font-semibold bg-zinc-600 hover:text-black hover:bg-magicTeal hover:ring-2 hover:ring-white transition-colors duration-300"
              >
                claudiastreats21@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Phone Section */}
        <div className="slide-element slide-left max-w-4xl mx-auto opacity-0 -translate-x-full transition-all duration-1000">
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 hover:ring-1 hover:ring-white">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-green-600 text-5xl">
                <i className="fas fa-phone animate__animated animate__bounce animate__infinite"></i>
              </div>
              <h2 className="text-2xl font-bold text-white">Call Us</h2>
              <p className="text-white text-lg max-w-md text-center">
                Need immediate assistance? We're just a call away!
              </p>
              <a
                href="tel:+13616522470"
                className="mt-2 px-6 py-2 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors duration-300 hover:ring-2 hover:ring-white animate-"
              >
                +1 (361) 652-2470
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Magic Munchies. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
