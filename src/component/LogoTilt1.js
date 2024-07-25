import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

const CanvasContents = ({ isMobile }) => {
  const { scene, animations } = useGLTF('/logo.gltf');
  const modelRef = useRef();
  const { gl } = useThree();

  useEffect(() => {
    let mixer = null;

    if (modelRef.current && animations && animations.length) {
      mixer = new THREE.AnimationMixer(modelRef.current);
      animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });
    }

    // Enable touch events to pass through
    gl.domElement.style.touchAction = 'auto';

    return () => {
      if (mixer) mixer.stopAllAction();
    };
  }, [animations, gl.domElement.style]);

  // Convert degrees to radians
  const rotationX = THREE.MathUtils.degToRad(325); // 10 degrees up
  const rotationY = THREE.MathUtils.degToRad(-20);  // No rotation on Y-axis
  const rotationZ = THREE.MathUtils.degToRad(0);  // 5 degrees to the left

  return (
    <>
      <ambientLight intensity={10} color="#ffffff" />
      <directionalLight position={[10, 10, 15]} intensity={1} color="#ffffff" />
      <group ref={modelRef} rotation={[rotationX, rotationY, rotationZ]}>
        <primitive object={scene} scale={[0.063, 0.07, 0.09]} position={[0, isMobile ? 0 : 1.5, 0]} />
      </group>
    </>
  );
};

const LogoTilt = () => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e) => {
      if (isMobile) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      containerRef.current.querySelectorAll('*').forEach((node) => {
        if (node.object3D) {
          gsap.to(node.object3D.rotation, {
            duration: 0.7,
            y: ((e.clientX - rect.left - centerX) / centerX) * 0.639,
            x: ((e.clientY - rect.top - centerY) / centerY) * 0.639,
            ease: "power4.out",
          });
        }
      });
    };

    const handleMouseLeave = () => {
      if (isMobile) return;

      containerRef.current.querySelectorAll('*').forEach((node) => {
        if (node.object3D) {
          gsap.to(node.object3D.rotation, {
            duration: 0.5,
            y: 0,
            x: 0,
            ease: "power4.out",
          });
        }
      });
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isMobile]);

  return (
    <div 
      ref={containerRef}
      style={{ 
        width: '100%', 
        height: '100vh', 
        position: 'relative', 
        overflow: 'hidden',
        touchAction: 'auto'
      }}
    >
      <Canvas
        style={{ background: 'transparent' }}
        camera={{ position: [0, 0, 15], fov: 50 }}
      >
        <CanvasContents isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default LogoTilt;
