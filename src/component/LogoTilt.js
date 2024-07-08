// LogoTilt.jsx
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useLoader, useThree, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import Nav from './Nav.js';
import sampleVideo from '../pages/banni.mp4';

function Model({ mouseX, mouseY }) {
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
      const maxTilt = THREE.MathUtils.degToRad(26); // 26 degrees in radians
      const targetRotationY = THREE.MathUtils.clamp(mouseX * maxTilt, -maxTilt, maxTilt);
      const targetRotationX = 1.57 + THREE.MathUtils.clamp(-mouseY * maxTilt, -maxTilt, maxTilt);

      const transitionSpeed = 0.1;

      objRef.current.rotation.y += (targetRotationY - objRef.current.rotation.y) * transitionSpeed;
      objRef.current.rotation.x += (targetRotationX - objRef.current.rotation.x) * transitionSpeed;
    }
  });

  return (
    <primitive 
      object={obj}
      ref={objRef}
      scale={0.0035}
    />
  );
}

const LogoTilt = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const divRef = useRef();

  const handleMouseMove = (event) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    setMousePosition({
      x: (event.clientX / windowWidth) * 2 - 1,
      y: -(event.clientY / windowHeight) * 2 + 1
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className='tilt' ref={divRef} style={{
      width: '100%',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
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
        <source src="../pages/banni.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      <Nav />
      <div className='tilt-container' style={{ 
        width: '100%', 
        height: 'calc(100% - 100px)', 
        position: 'absolute',
        top: '100px', // Adjust based on your navbar height
        left: 0,
      }}>
        <Canvas style={{ width: '100%', height: '70%' }}>
          <PerspectiveCamera makeDefault position={[0, -1, 6]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Model mouseX={mousePosition.x} mouseY={mousePosition.y} />
        </Canvas>
      </div>
      

      
    </div>
  );
};

export default LogoTilt;
