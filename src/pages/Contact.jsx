import React from "react";

function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#ffb6a1] via-[#fff4e6] to-[#f97c7c] flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-[#f97c7c] mb-4">
          Get in Touch
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          We'd love to hear from you! Feel free to reach out via any of the
          options below.
        </p>

        {/* Contact Options */}
        <div className="space-y-6">
          {/* Facebook */}
          <div className="flex items-center gap-4">
            <span className="text-pink-500 text-2xl">
              <i className="fab fa-facebook"></i>
            </span>
            <a
              href="#"
              className="text-lg text-[#f97c7c] font-semibold hover:underline"
              placeholder="Enter your Facebook link"
            >
              Your Facebook Link
            </a>
          </div>

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

          {/* Phone */}
          <div className="flex items-center gap-4">
            <span className="text-green-500 text-2xl">
              <i className="fas fa-phone"></i>
            </span>
            <a
              href="tel:#"
              className="text-lg text-[#f97c7c] font-semibold hover:underline"
              placeholder="Enter your phone number"
            >
              +1 (361) 652-2470
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Magic Munchies. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
