import { useEffect } from "react";

function ContactPage() {
  useEffect(() => {
    // Create the observer with options for smoother animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When an element enters the viewport
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            // Remove the 'show' class when the element leaves the viewport
            entry.target.classList.remove("show");
          }
        });
      },
      {
        root: null,
        threshold: 0, // Trigger when just 10% is visible
        rootMargin: "0px",
      }
    );

    // Get all elements with the 'slide-element' class
    const slideElements = document.querySelectorAll(".slide-element");
    slideElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen  w-full h-full mx-auto bg-contactImage1 bg-cover bg-center bg-no-repeat overflow-x-hidden">
      {/* Hero Section */}
      <div className="w-full h-screen flex items-center justify-center sticky top-0 z-10 bg-contactImage bg-cover bg-center bg-no-repeat bg-magicTeal">
        <div className="text-center animate-fade-in">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text mb-4">
            Let's Connect
          </h1>
          <p className="text-black text-xl">Scroll down</p>
          <div className="mt-8 animate-bounce">
            <span className="text-black text-4xl">↓</span>
          </div>
        </div>
      </div>

      <div className="relative z-20 px-4 py-12 space-y-32">
        {/* Facebook Section */}
        <div className="slide-element slide-left max-w-4xl mx-auto opacity-0 -translate-x-full transition-all duration-1000">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20  p-8 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 hover:ring-2 hover:ring-white">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-blue-600 text-5xl">
                <i className="fab fa-facebook animate-pulse"></i>
              </div>
              <h2 className="text-2xl font-bold text-white">
                Connect on Facebook
              </h2>
              <p className="text-white text-lg max-w-md text-center">
                Join our community for updates and special offers!
              </p>
              <a
                href="#"
                className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 hover:ring-2 hover:ring-white"
              >
                Visit Our Page
              </a>
            </div>
          </div>
        </div>

        {/* Email Section */}
        <div className="slide-element slide-right max-w-4xl mx-auto opacity-0 translate-x-full transition-all duration-1000">
          <div className="bg-gradient-to-br from-magicTeal/20 to-slate-800/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 hover:ring-2 hover:ring-black">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-white text-5xl">
                <i className="far fa-envelope animate-bounce"></i>
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
                <i className="fas fa-phone animate-wiggle"></i>
              </div>
              <h2 className="text-2xl font-bold text-white">Call Us</h2>
              <p className="text-white text-lg max-w-md text-center">
                Need immediate assistance? We're just a call away!
              </p>
              <a
                href="tel:+13616522470"
                className="mt-2 px-6 py-2 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors duration-300 hover:ring-2 hover:ring-white"
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
