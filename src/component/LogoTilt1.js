import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const CanvasContents = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { scene, animations } = useGLTF('/logo.gltf');
  const modelRef = useRef();
  const { gl, size } = useThree();

  useEffect(() => {
    let mixer = null;

    if (modelRef.current && animations && animations.length) {
      mixer = new THREE.AnimationMixer(modelRef.current);
      animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });
    }

    gl.domElement.style.touchAction = 'auto';

    return () => {
      if (mixer) mixer.stopAllAction();
    };
  }, [animations, gl.domElement.style]);

  useFrame(() => {
    if (modelRef.current) {
      const { width } = size;
      const fixedHeight = 690; // Fixed height in pixels

      // Base scale factor (adjust this to fit your model)
      const baseScale = 0.00019;

      // Calculate scale based on width, maintaining aspect ratio
      let scale = baseScale * width;

      // Adjust scale if it would make the height exceed 690px
      const aspectRatio = width / fixedHeight;
      if (aspectRatio > 1) {
        scale = baseScale * fixedHeight;
      }

      // Fine-tuning based on specific width ranges
      if (width < 400) {
        scale *= 0.98;
      } else if (width > 600 && isMobile) {
        scale *= 1.05;
      }

      modelRef.current.scale.set(scale, scale, scale);
    }
  });

  const rotationX = THREE.MathUtils.degToRad(325);
  const rotationY = THREE.MathUtils.degToRad(-20);
  const rotationZ = THREE.MathUtils.degToRad(0);
  const yPosition = {size} < 520 ? 45 : 28;
  return (
    <>
      <ambientLight intensity={10} color="#ffffff" />
      <directionalLight position={[10, 10, 15]} intensity={1} color="#ffffff" />
      <group ref={modelRef} rotation={[rotationX, rotationY, rotationZ]}>
        <primitive object={scene} position={[-3, yPosition, 0]} />
      </group>
    </>
  );
};

const LogoTilt = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '690px', // Fixed height
        position: 'relative',
        overflow: 'hidden',
        touchAction: 'auto'
      }}
    >
      <Canvas
        style={{ background: 'transparent' }}
        camera={{ position: [0, 0, 15], fov: 50 }}
      >
        <CanvasContents />
      </Canvas>
    </div>
  );
};

export default LogoTilt;