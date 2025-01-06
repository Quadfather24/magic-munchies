// import { useState } from "react";
// import Grid from "./components/grid.jsx";
// import dipStraw from "./assets/dipped-strawberry.png";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* This route matches "/" exactly and renders <Home /> */}
        <Route path="/" element={<Home />} />

        {/* This route matches "/gallery" and renders <Gallery /> */}
        <Route path="/gallery" element={<Gallery />} />

        {/* This route matches "/about" and renders <About /> */}
        <Route path="/about" element={<About />} />

        {/* This route matches "/contact" and renders <About /> */}
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
