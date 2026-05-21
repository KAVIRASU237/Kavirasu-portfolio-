import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Vertex Shader
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment Shader with Custom Tint and Fresnel Glow
const fragmentShader = `
  #define NUM_OCTAVES 5
  uniform vec4 resolution;
  uniform float time;
  uniform sampler2D color;
  uniform sampler2D colormap;
  uniform sampler2D noiseTex;
  uniform vec3 uColorTint; // Custom color tinting vector
  varying vec2 vUv;
  varying vec3 vNormal;

  float rand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }

  float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);

    float res = mix(
      mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
      mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
    return res*res;
  }

  float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
      v += a * noise(x);
      x = rot * x * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  float grayScale(float r, float g, float b){
    return 0.30*r + 0.59*g + 0.11*b;
  }

  void main() {
    // Generate view-space spherical normal texture coordinate mapping
    vec2 uv = vNormal.xy * 0.5 + 0.5;
    vec2 newUv = uv + vec2(0.0, -time * 0.0006);
    float density = 2.0;
    vec2 p = newUv * density;
    
    // Gaseous fluid turbulence
    float noiseVal = fbm(p + fbm(p + fbm(p + fbm(p))));
    vec4 tempColor = vec4(vec3(noiseVal), 1.0);
    
    // Combine noise layers
    vec4 grad = texture2D(color, tempColor.rg);
    vec3 tex = texture2D(noiseTex, uv * 0.5 + tempColor.rg * 0.25).rgb;
    
    vec4 composite = vec4(tex, 1.0) + grad;
    float tone = grayScale(composite.r, composite.g, composite.b);
    
    // Original gradient colormap lookup
    vec3 baseColor = texture2D(colormap, vec2(tone, 0.0)).rgb;
    
    // Apply custom programmatic color tint
    vec3 tinted = baseColor * uColorTint;
    
    // Vibrant, self-illuminated cinematic Fresnel atmosphere rim glow
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    float fresnel = pow(1.0 - max(dot(normalize(vNormal), viewDir), 0.0), 2.8); // Smooth, natural atmospheric envelope
    vec3 glowColor = uColorTint * 1.25; // High-intensity self-illuminating halo glow
    
    gl_FragColor = vec4(tinted + fresnel * glowColor, 1.0);
  }
`;

const PlanetBackground3D = () => {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  
  // High-performance spaceship flight velocity tracking (matches SpaceShipBackground)
  const mousePosRef = useRef({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });
  const hasMovedMouseRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Center starting positions (pointing coolly right on load)
    positionRef.current = { x: width / 2, y: height / 2 };
    mousePosRef.current = { x: width / 2 + width / 4, y: height / 2 - 100 };

    // Create Scene
    const scene = new THREE.Scene();

    // Create Camera
    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
    camera.position.set(0, 0, 15);
    cameraRef.current = camera;

    // Create Renderer with transparency
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    rendererRef.current = renderer;

    // Load Textures with CORS support
    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = 'anonymous';

    const colormap = textureLoader.load("https://raw.githubusercontent.com/pizza3/asset/master/color.png");
    const colorTex = textureLoader.load("https://raw.githubusercontent.com/pizza3/asset/master/noise2.jpg");
    const noiseTex = textureLoader.load("https://raw.githubusercontent.com/pizza3/asset/master/fluid.jpg");

    colormap.wrapS = colormap.wrapT = THREE.ClampToEdgeWrapping;
    colormap.minFilter = THREE.LinearFilter;

    colorTex.wrapS = colorTex.wrapT = THREE.RepeatWrapping;
    colorTex.minFilter = THREE.LinearFilter;

    noiseTex.wrapS = noiseTex.wrapT = THREE.RepeatWrapping;
    noiseTex.minFilter = THREE.LinearFilter;

    // Light Setup
    const hemislight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.3);
    scene.add(hemislight);

    const pointlight = new THREE.PointLight(0xffffff, 0.8, 100);
    pointlight.position.set(30, 40, 20);
    scene.add(pointlight);

    // Planet density count: 3 for mobile, 7 for desktop
    const isMobileScreen = window.innerWidth < 768;
    const PLANET_COUNT = isMobileScreen ? 3 : 7;

    // Premium glowing, vibrant color palette range for celestial bodies
    const TINTS = [
      new THREE.Vector3(0.85, 0.18, 0.28),  // Glowing Ruby Crimson
      new THREE.Vector3(0.15, 0.85, 0.55),  // Glowing Emerald Green
      new THREE.Vector3(0.55, 0.25, 0.85),  // Glowing Amethyst Purple
      new THREE.Vector3(0.85, 0.50, 0.12),  // Glowing Amber Gold
      new THREE.Vector3(0.12, 0.55, 0.85),  // Glowing Sapphire Blue
      new THREE.Vector3(0.85, 0.22, 0.65),  // Glowing Rose Pink
      new THREE.Vector3(0.12, 0.85, 0.85)   // Glowing Cyber Cyan
    ];

    const planetMeshes = [];
    const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);

    // Generate random planet stars scattered across space layers
    for (let i = 0; i < PLANET_COUNT; i++) {
      // 1. Random depth Z between -5.0 (close) and -15.0 (deep background)
      const z = -5.0 - Math.random() * 10.0;

      // 2. Parallax scale proportional to depth (closer = faster, deeper = slower)
      // Map z range [-15.0, -5.0] to scale range [0.25, 0.95]
      const parallaxScale = ((z - (-15.0)) / 10.0) * 0.7 + 0.25;

      // 3. Calculate initial visible bounds at this specific Z depth to spawn on-screen
      const distToCam = camera.position.z - z;
      const aspect = width / height;
      const visibleHeight = 2.0 * Math.tan((camera.fov * Math.PI) / 360) * distToCam;
      const visibleWidth = visibleHeight * aspect;

      // 4. Random coordinate inside camera bounds
      const x = (Math.random() - 0.5) * visibleWidth;
      const y = (Math.random() - 0.5) * visibleHeight;

      // 5. Radius proportional to depth (larger if closer, smaller if further away)
      const depthRatio = (z - (-15.0)) / 10.0; // 0 to 1
      const radius = (Math.random() * 0.6 + 0.4) * (1.0 + depthRatio * 1.5); // 0.4 to 2.5 units

      // 6. Randomize axial tilt, rotation direction and flow speeds
      const tint = TINTS[Math.floor(Math.random() * TINTS.length)];
      const rotationSpeed = (Math.random() * 0.0015 + 0.001) * (Math.random() < 0.5 ? 1 : -1);
      const flowMultiplier = Math.random() * 0.6 + 0.4;
      const tilt = Math.random() * Math.PI * 2;

      const config = {
        name: `Planet_${i}`,
        radius,
        position: new THREE.Vector3(x, y, z),
        tint,
        rotationSpeed,
        flowMultiplier,
        tilt,
        parallaxScale
      };

      const uniforms = {
        time: { value: 0.0 },
        resolution: { value: new THREE.Vector2(width, height) },
        color: { value: colorTex },
        colormap: { value: colormap },
        noiseTex: { value: noiseTex },
        uColorTint: { value: config.tint }
      };

      const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        transparent: true,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        depthWrite: false,
      });

      const mesh = new THREE.Mesh(sphereGeometry, shaderMaterial);
      mesh.scale.setScalar(config.radius);
      mesh.position.copy(config.position);
      mesh.rotation.z = config.tilt;

      scene.add(mesh);
      planetMeshes.push({
        mesh: mesh,
        material: shaderMaterial,
        config: config
      });
    }

    // Resize Handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      
      // Re-center virtual ship coordinates
      positionRef.current = { x: width / 2, y: height / 2 };
      if (!hasMovedMouseRef.current) {
        mousePosRef.current = { x: width / 2 + width / 4, y: height / 2 - 100 };
      }

      if (cameraRef.current) {
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
      }
      if (rendererRef.current) {
        rendererRef.current.setSize(width, height);
      }
    };
    window.addEventListener('resize', handleResize);

    // Mouse & Touch pixel velocity tracking
    const handleMouseMove = (event) => {
      const e = (event.touches && event.touches[0]) || event;
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      hasMovedMouseRef.current = true;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleMouseMove, { passive: true });

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Exponential decay ship velocity matching SpaceShipBackground
      const pos = positionRef.current;
      const mousePos = mousePosRef.current;

      const shipVelocityX = (mousePos.x - pos.x) * 0.09;
      const shipVelocityY = (mousePos.y - pos.y) * 0.09;

      pos.x += shipVelocityX;
      pos.y += shipVelocityY;

      // Coordinate scaling factor to bridge 2D pixel speeds into 3D units smoothly
      const velocityScale = 0.007;

      planetMeshes.forEach(item => {
        // Move the 3D planet opposite to the ship flight velocity
        const dx = shipVelocityX * velocityScale * item.config.parallaxScale;
        const dy = shipVelocityY * velocityScale * item.config.parallaxScale;

        // SpaceShip moves right -> Planets move left (subtract)
        item.mesh.position.x -= dx;
        // SpaceShip moves down -> Planets move up (add, since WebGL Y is positive upwards)
        item.mesh.position.y += dy;

        // Dynamic off-screen wrapping boundaries based on current planet Z depth
        const distToCam = camera.position.z - item.mesh.position.z;
        const aspect = window.innerWidth / window.innerHeight;
        
        // Frustum dimensions at this specific Z plane
        const visibleHeight = 2.0 * Math.tan((camera.fov * Math.PI) / 360) * distToCam;
        const visibleWidth = visibleHeight * aspect;

        // Cushion padding based on planet size to prevent pop-ins
        const horizontalLimit = (visibleWidth / 2) + item.config.radius * 1.5;
        const verticalLimit = (visibleHeight / 2) + item.config.radius * 1.5;

        // Endless universe wrapping loop
        if (item.mesh.position.x > horizontalLimit) {
          item.mesh.position.x = -horizontalLimit;
        } else if (item.mesh.position.x < -horizontalLimit) {
          item.mesh.position.x = horizontalLimit;
        }

        if (item.mesh.position.y > verticalLimit) {
          item.mesh.position.y = -verticalLimit;
        } else if (item.mesh.position.y < -verticalLimit) {
          item.mesh.position.y = verticalLimit;
        }

        // Increment shader flow animation time
        item.material.uniforms.time.value = elapsedTime * 40.0 * item.config.flowMultiplier;

        // Slow mesh rotation on planet's own axis
        item.mesh.rotation.y += item.config.rotationSpeed;
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);

      // Dispose resources cleanly
      sphereGeometry.dispose();
      planetMeshes.forEach(item => {
        item.material.dispose();
      });
      colormap.dispose();
      colorTex.dispose();
      noiseTex.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: -1, // Sits deep in the background layers
      }}
    />
  );
};

export default PlanetBackground3D;
