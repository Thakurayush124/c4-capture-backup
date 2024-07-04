import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/contact';
import About from './pages/about';
import Services from './pages/services';
import Layout from "./pages/Layout";
import './App.css'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About/>} />
          <Route path="/services" element={<Services/>} />
          <Route path="/contact" element={<Contact />} />
          
        </Route>
      </Routes>
    </div>
  );
}

export default App;
