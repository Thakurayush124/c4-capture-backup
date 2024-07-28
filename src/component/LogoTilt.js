import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try refreshing the page.</h1>;
    }
    return this.props.children;
  }
}

// Loading component
const Loader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <h2>Loading...</h2>
  </div>
);

// Model component
const Model = ({ url }) => {
  const { scene, animations } = useGLTF(url);
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
          gsap.to(node.rotation, {
            duration: 0.7,
            y: ((e.clientX - centerX) / centerX) * 0.639,
            x: ((e.clientY - centerY) / centerY) * 0.639,
            ease: "power4.out",
          });
        }
      });
    };

    const handleMouseLeave = () => {
      scene.traverse((node) => {
        if (node.isMesh) {
          gsap.to(node.rotation, {
            duration: 0.5,
            y: 0,
            x: 0,
            ease: "power4.out",
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (mixer) mixer.stopAllAction();
    };
  }, [animations, scene]);

  return (
    <group ref={modelRef}>
      <primitive object={scene} scale={[0.05, 0.05, 0.05]} position={[0, 1.5, 0]} />
    </group>
  );
};

// Main LogoTilt component
const LogoTilt = () => {
  const [modelUrl] = useState('/logo.gltf');

  return (
    <ErrorBoundary>
      <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
        <Canvas
          style={{ background: 'transparent' }}
          camera={{ position: [0, 0, 10], fov: 50 }}
        >
          <ambientLight intensity={10} color="#ffffff" />
          <directionalLight position={[10, 10, 15]} intensity={1} color="#ffffff" />
          <OrbitControls
            enableRotate={false}
            enableZoom={false}
            enablePan={false}
          />
          <Suspense fallback={null}>
            <Model url={modelUrl} />
          </Suspense>
        </Canvas>
      </div>
    </ErrorBoundary>
  );
};

// Wrapper component with Suspense
const LogoTiltWrapper = () => (
  <Suspense fallback={<Loader />}>
    <LogoTilt />
  </Suspense>
);

export default LogoTiltWrapper;