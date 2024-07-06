import React, { useState } from 'react';
import './SpiderComponent.css';

const SpiderComponent = () => {
  const [activeLeft, setActiveLeft] = useState(null);
  const [activeRight, setActiveRight] = useState(null);

  const leftServices = ['1', '2', '3'];
  const rightServices = ['A', 'B', 'C'];

  return (
    <div className="spider-container">
      <div className="spider-center">
        <div className="spider-leg-left">
          {leftServices.map((service, index) => (
            <div
              key={index}
              className={`leg-part left ${activeLeft === index ? 'active' : ''}`}
              onMouseEnter={() => setActiveLeft(index)}
              onMouseLeave={() => setActiveLeft(null)}
            >
              {service}
            </div>
          ))}
        </div>
        <div className="spider-body"></div>
        <div className="spider-leg-right">
          {rightServices.map((service, index) => (
            <div
              key={index}
              className={`leg-part right ${activeRight === index ? 'active' : ''}`}
              onMouseEnter={() => setActiveRight(index)}
              onMouseLeave={() => setActiveRight(null)}
            >
              {service}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpiderComponent;
