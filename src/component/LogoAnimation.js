import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { gsap, Power4 } from 'gsap';

const DUR = 1.25;
const DATA = {
  'mobile': {
    'size': 0.0024,
    'y-offset': -0.1,
  },
  'all': {
    'size': 0.0015,
    'y-offset': -0.2,
  }
};
const MOBILE_BREAKPOINT = 950;
const MOUSE_TOLERANCE = 0.639;
const WH_RATIO = 0.56222548;

const LogoAnimation = () => {
  const rootRef = useRef();
  let scene, renderer, camera, tl, originalAspect, ww, wh, SIZE, device, Y_OFFSET;

  const initScene = () => {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      transparent: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    ww = document.documentElement.clientWidth * 0.8;
    wh = ww * WH_RATIO;
    device = (ww < MOBILE_BREAKPOINT) ? 'mobile' : 'all';
    SIZE = DATA[device]['size'];
    Y_OFFSET = DATA[device]['y-offset'];
    renderer.setSize(ww, wh);
    rootRef.current.appendChild(renderer.domElement);
    scene = new THREE.Scene();
    let aspectRatio = ww / wh;
    originalAspect = ww / wh;
    camera = new THREE.OrthographicCamera(-aspectRatio / 2, aspectRatio / 2, 0.5, -0.5, 0.1, 1000);
    camera.position.z = 900;
    scene.add(camera);
    const light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
    tl = gsap.timeline();
  };

  const loadOBJMTL = () => {
    const mtlLoader = new MTLLoader();
    mtlLoader.load('/public/logo.mtl', (materials) => {
      materials.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load('/public/logo.obj', (object) => {
        object.scale.set(SIZE, SIZE, SIZE);
        object.rotation.set(0.5, 0.5, 0);
        object.position.y += -Y_OFFSET;
        scene.add(object);
      }, (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      }, (error) => {
        console.log(error);
      });
    });
  };

  const render = () => {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  };

  const handleResize = () => {
    device = (ww < MOBILE_BREAKPOINT) ? 'mobile' : 'all';
    ww = document.documentElement.clientWidth * 0.8;
    wh = ww * WH_RATIO;
    let aspect = ww / wh,
      change = originalAspect / aspect;
    camera.left = -aspect * change / 2;
    camera.right = aspect * change / 2;
    camera.top = change / 2;
    camera.bottom = -change / 2;
    camera.updateProjectionMatrix();
    renderer.setSize(ww, wh);
  };

  const attachEvents = () => {
    document.addEventListener('mousemove', (e) => {
      let centerX = ww / 2,
        centerY = wh / 2;
      scene.traverse((node) => {
        if (node instanceof THREE.Group) {
          gsap.to(node.rotation, {
            duration: DUR,
            y: (e.clientX - centerX) / centerX * MOUSE_TOLERANCE,
            x: (e.clientY - centerY) / centerY * MOUSE_TOLERANCE,
            ease: Power4.easeOut,
          });
        }
      });
    });

    document.addEventListener('mouseleave', () => {
      gsap.to(camera.rotation, {
        duration: 1,
        y: 0,
        x: 0,
        ease: Power4.easeOut,
      });
    });

    window.addEventListener('resize', handleResize, false);
  };

  useEffect(() => {
    initScene();
    loadOBJMTL();
    render();
    attachEvents();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div id="logo_animation" ref={rootRef} />
  );
};

export default LogoAnimation;
