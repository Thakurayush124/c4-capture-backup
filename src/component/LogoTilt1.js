import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useLoader, useThree, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import Nav from './Nav.js';
import sampleVideo from '../pages/banni.mp4'; // import your video file

function Model({ isHovering, mouseX, mouseY }) {
  const objRef = useRef();
  const { scene } = useThree();
  const materials = useLoader(MTLLoader, 'logo.mtl');
  const obj = useLoader(OBJLoader, 'logo.obj', (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  useEffect(() => {
    if (obj) {
      const box = new THREE.Box3().setFromObject(obj);
      const center = box.getCenter(new THREE.Vector3());
      obj.position.sub(center);
      
      obj.rotation.x = 1.57;
    }
  }, [obj, scene]);

  useFrame(() => {
    if (objRef.current) {
      const maxTilt = 0.523; // 30 degrees in radians
      const targetRotationY = isHovering ? THREE.MathUtils.clamp(mouseX * maxTilt, -maxTilt, maxTilt) : 0;
      const targetRotationX = isHovering ? 1.57 + THREE.MathUtils.clamp(-mouseY * maxTilt, -maxTilt, maxTilt) : 1.57;

      const transitionSpeed = isHovering ? 0.1 : 0.02; // Adjust transition speed here

      objRef.current.rotation.y += (targetRotationY - objRef.current.rotation.y) * transitionSpeed;
      objRef.current.rotation.x += (targetRotationX - objRef.current.rotation.x) * transitionSpeed;
    }
  });

  return (
    <primitive 
      object={obj} 
      ref={objRef} 
      scale={0.002} 
    />
  );
}

const LogoTilt = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const divRef = useRef();

  const handleMouseMove = (event) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setMousePosition({
      x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((event.clientY - rect.top) / rect.height) * 2 + 1
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div className="video-container" style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <video 
        src={sampleVideo} 
        autoPlay 
        loop 
        muted 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover' 
        }} 
      />
      <div 
        className="tilt-container" 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%' 
        }}
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Nav />
        <Canvas className="tilt-container">
          <PerspectiveCamera makeDefault position={[0, 0, 6]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Model isHovering={isHovering} mouseX={mousePosition.x} mouseY={mousePosition.y} />
        </Canvas>
      </div>
    </div>
  );
};

export default LogoTilt;
