import { useEffect, useState } from "react";
import "animate.css";
// Restore the critical image imports
import contact1 from "../assets/images/background/contact1.svg";
import contact from "../assets/images/background/contact.svg";

function ContactPage() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // Image preloading logic - ensures smooth loading of background images
    const imageUrls = [contact1, contact];
    let loadedImages = 0;

    const head = document.head;
    imageUrls.forEach((url) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = url;
      head.appendChild(link);
    });

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

    // Smooth scroll detection with debouncing to prevent excessive updates
    let timeoutId;
    const handleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        const currentScrollY = window.scrollY;
        setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
        setLastScrollY(currentScrollY);
      }, 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Enhanced Intersection Observer with spring-like animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target;

          if (entry.isIntersecting) {
            // Apply enhanced spring-like animations for smooth entry
            element.style.opacity = "1";
            element.style.transform = "translateX(0) scale(1)";
            element.style.transition =
              "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
          } else {
            // Smooth exit animations with subtle scale effect
            if (element.classList.contains("slide-left")) {
              element.style.transform = "translateX(-50px) scale(0.95)";
            } else if (element.classList.contains("slide-right")) {
              element.style.transform = "translateX(50px) scale(0.95)";
            }
            element.style.opacity = "0";
            element.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
          }
        });
      },
      {
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
        rootMargin: "-5% 0px -5% 0px",
      }
    );

    const slideElements = document.querySelectorAll(".slide-element");
    slideElements.forEach((el) => {
      el.style.willChange = "transform, opacity";
      observer.observe(el);
    });

    // Cleanup function to prevent memory leaks
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
      const links = document.head.querySelectorAll(
        'link[rel="preload"][as="image"]'
      );
      links.forEach((link) => link.remove());
    };
  }, [lastScrollY]);

  // Background styles with smooth fade-in transitions
  const containerStyle = {
    backgroundImage: `url(${contact1})`,
    opacity: imagesLoaded ? 1 : 0,
    transition: "opacity 0.5s ease-in-out",
  };

  const heroStyle = {
    backgroundImage: `url(${contact})`,
    opacity: imagesLoaded ? 1 : 0,
    transition: "opacity 0.5s ease-in-out",
  };

  return (
    <div
      className="min-h-screen w-full h-full mx-auto bg-cover bg-center bg-no-repeat overflow-x-hidden"
      style={containerStyle}
    >
      {/* Hero Section with enhanced animations */}
      <div
        className="w-full h-screen flex items-center justify-center sticky top-0 z-10 bg-cover bg-center bg-no-repeat bg-magicTeal"
        style={heroStyle}
      >
        <div className="text-center mb-7">
          <p className="mt-9 text-black text-xl animate__animated animate__fadeInUp animate__delay-2s">
            Scroll down
          </p>
          <div className="mt-7 animate__animated animate__bounce animate__infinite animate__slow animate__delay-3s">
            <span className="text-black text-4xl">↓</span>
          </div>
        </div>
      </div>

      {/* Content sections with transparent containers */}
      <div className="relative z-20 px-4 py-12 space-y-32">
        {/* Facebook Section */}
        <div className="slide-element slide-left max-w-4xl mx-auto opacity-0 -translate-x-full">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/30 p-8 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-white/10">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-blue-700 text-5xl">
                <i className="fab fa-facebook animate__animated animate__bounce animate__infinite animate__slow"></i>
              </div>
              <h2 className="text-2xl font-bold text-white">
                Connect on Facebook
              </h2>
              <p className="text-white text-lg max-w-md text-center">
                Join our community for updates and special offers!
              </p>
              <a
                href="https://www.facebook.com/groups/265346302113024/?ref=share&mibextid=NSMWBT"
                className="mt-2 px-6 py-2 bg-white/90 text-blue-600 rounded-full font-semibold hover:bg-white transition-all duration-300"
              >
                Visit Our Page
              </a>
            </div>
          </div>
        </div>

        {/* Email Section */}
        <div className="slide-element slide-right max-w-4xl mx-auto opacity-0 translate-x-full">
          <div className="bg-gradient-to-br from-magicTeal/10 to-slate-800/30 p-8 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-white/10">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-white text-5xl">
                <i className="far fa-envelope animate__animated animate__bounce animate__infinite animate__slow"></i>
              </div>
              <h2 className="text-2xl font-bold text-white">Email Us</h2>
              <p className="text-white text-lg max-w-md text-center">
                Have a question? Drop us a line anytime!
              </p>
              <a
                href="mailto:claudiastreats21@gmail.com"
                className="mt-2 px-6 py-2 bg-white/90 text-slate-800 rounded-full font-semibold hover:bg-white transition-all duration-300"
              >
                claudiastreats21@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Phone Section */}
        <div className="slide-element slide-left max-w-4xl mx-auto opacity-0 -translate-x-full">
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/30 p-8 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-white/10">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-green-600 text-5xl">
                <i className="fas fa-phone animate__animated animate__bounce animate__infinite animate__slow"></i>
              </div>
              <h2 className="text-2xl font-bold text-white">Call Us</h2>
              <p className="text-white text-lg max-w-md text-center">
                Need immediate assistance? We're just a call away!
              </p>
              <a
                href="tel:+13616522470"
                className="mt-2 px-6 py-2 bg-white/90 text-green-600 rounded-full font-semibold hover:bg-white transition-all duration-300"
              >
                +1 (361) 652-2470
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-8">
        <p className="text-sm text-white">
          © {new Date().getFullYear()} Magic Munchies. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default ContactPage;
