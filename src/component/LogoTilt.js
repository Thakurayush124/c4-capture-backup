import React, { useRef, useState } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function Model() {
  const objRef = useRef();
  const materials = useLoader(MTLLoader, 'logo.mtl');
  const obj = useLoader(OBJLoader, 'logo.obj', (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  React.useEffect(() => {
    if (obj) {
      // Center the object
      const box = new THREE.Box3().setFromObject(obj);
      const center = box.getCenter(new THREE.Vector3());
      obj.position.sub(center);
      
      // Set the rotation
      obj.rotation.x = 1.57;
      
      // Add bounding box helper
      const helper = new THREE.BoxHelper(obj, 0xffff00);
      obj.add(helper);
    }
  }, [obj]);

  // Tilt effect
  useFrame((state) => {
    if (objRef.current) {
      const { mouse } = state;
      objRef.current.rotation.y = -mouse.x * 0.5;
      objRef.current.rotation.z = mouse.y * 0.5;
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
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Model />
      </Canvas>
    </div>
  );
};

export default LogoTilt;
