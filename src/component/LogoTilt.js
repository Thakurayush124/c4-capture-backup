import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { TweenLite, Power4 } from 'gsap';

const LogoTilt = () => {
  const { scene, animations } = useGLTF('/logo.gltf');
  const modelRef = useRef();

  useEffect(() => {
    let mixer = null;

    if (modelRef.current && animations && animations.length) {
      mixer = new THREE.AnimationMixer(modelRef.current);
      animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });
    }

    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      scene.traverse((node) => {
        if (node.isMesh) {
          TweenLite.to(node.rotation, 0.7, {
            y: ((e.clientX - centerX) / centerX) * 0.639,
            x: ((e.clientY - centerY) / centerY) * 0.639,
            ease: Power4.easeOut,
          });
        }
      });
    };

    const handleMouseLeave = () => {
      scene.traverse((node) => {
        if (node.isMesh) {
          TweenLite.to(node.rotation, 0.5, {
            y: 0,
            x: 0,
            ease: Power4.easeOut,
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [animations, scene]);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Canvas
        style={{ background: 'transparent' }}
        camera={{ position: [0, 0, 10], fov: 50 }}
      >
        <ambientLight intensity={10} color="#ffffff" />
        <directionalLight position={[10, 10, 15]} intensity={1} color="#ffffff" />
        <OrbitControls
          enableRotate={false} // Disable rotation
          enableZoom={false} // Disable zooming
          enablePan={false} // Disable panning
        />
        <group ref={modelRef}>
          <primitive object={scene} scale={[0.05, 0.05, 0.05]} position={[0, 1.5, 0]} />
        </group>
      </Canvas>
    </div>
  );
};

export default LogoTilt;
