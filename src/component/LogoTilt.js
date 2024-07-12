
//fast

import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { TweenLite, Power4 } from 'gsap';
import video from '../pages/banni.mp4';

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
          TweenLite.to(node.rotation, 0.5, {  // Adjusted duration to reduce delay
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
          TweenLite.to(node.rotation, 0.5, {  // Adjusted duration to reduce delay
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
      <video
        autoPlay
        loop
        muted
        src={video}
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: '-1',
        }}
      />
      <Canvas>
        <ambientLight intensity={10} color="#ffffff" />
        <directionalLight position={[10, 10, 15]} intensity={1} color="#ffffff" />
        <OrbitControls
          enableRotate={false} // Disable rotation
          enableZoom={false} // Disable zooming
          enablePan={false} // Disable panning
        />
        <group ref={modelRef}>
          <primitive object={scene} scale={[0.05, 0.05, 0.05]} position={[0, 1.6, 0]} />
        </group>
      </Canvas>
    </div>
  );
};

export default LogoTilt;


// too smooth

// import React, { useEffect, useRef } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, useGLTF } from '@react-three/drei';
// import * as THREE from 'three';
// import { TweenLite, Power4 } from 'gsap';
// import video from '../pages/banni.mp4';

// const LogoTilt = () => {
//   const { scene, animations } = useGLTF('/logo.gltf');
//   const modelRef = useRef();

//   useEffect(() => {
//     if (!scene) {
//       console.error('Scene not loaded');
//       return;
//     }

//     let mixer = null;

//     if (modelRef.current && animations && animations.length) {
//       mixer = new THREE.AnimationMixer(modelRef.current);
//       animations.forEach((clip) => {
//         mixer.clipAction(clip).play();
//       });
//     }

//     const handleMouseMove = (e) => {
//       const centerX = window.innerWidth / 2;
//       const centerY = window.innerHeight / 2;

//       scene.traverse((node) => {
//         if (node.isMesh) {
//           TweenLite.to(node.rotation, 1.25, {
//             y: ((e.clientX - centerX) / centerX) * 0.639,
//             x: ((e.clientY - centerY) / centerY) * 0.639,
//             ease: Power4.easeOut,
//           });
//         }
//       });
//     };

//     const handleMouseLeave = () => {
//       scene.traverse((node) => {
//         if (node.isMesh) {
//           TweenLite.to(node.rotation, 1, {
//             y: 0,
//             x: 0,
//             ease: Power4.easeOut,
//           });
//         }
//       });
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('mouseleave', handleMouseLeave);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('mouseleave', handleMouseLeave);
//     };
//   }, [animations, scene]);

//   return (
//     <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
//       <video
//         autoPlay
//         loop
//         muted
//         src={video}
//         style={{
//           position: 'absolute',
//           top: '0',
//           left: '0',
//           width: '100%',
//           height: '100%',
//           objectFit: 'cover',
//           zIndex: '-1',
//         }}
//       />
//       <Canvas>
//         <ambientLight intensity={10} color="#ffffff" />
//         <directionalLight position={[10, 10, 15]} intensity={1} color="#ffffff" />
//         <OrbitControls
//           enableRotate={false} // Disable rotation
//           enableZoom={false} // Disable zooming
//           enablePan={false} // Disable panning
//         />
//         <group ref={modelRef}>
//           <primitive object={scene} scale={[0.05, 0.05, 0.05]} position={[0, 0, 0]} />
//         </group>
//       </Canvas>
//     </div>
//   );
// };

// export default LogoTilt;
