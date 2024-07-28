import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/contact';
import Part from "./pages/part";
import About from './pages/about';
import Services from './pages/services';
import Layout from "./pages/Layout";
import Drop1 from './component/dropdown_service1';
import Drop2 from './component/dropdown_service2';
import './App.css'
import $ from 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Ensure jQuery is available globally
window.jQuery = $;
window.$ = $;

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About/>} />
          <Route path="/services" element={<Services/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/drop1" element={<Drop1 />} />
          <Route path="/drop2" element={<Drop2 />} />
          <Route path="/Part" element={<Part/>} />
           

        </Route>
      </Routes>
    </div>
  );
}

export default App;
