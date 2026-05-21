import React, { useEffect, useRef } from 'react';

const SpaceShipBackground = () => {
  const canvasRef = useRef(null);

  // References to keep high-performance values across animation frames
  const mousePosRef = useRef({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });
  const currentAngleRef = useRef(0); // Tracks current rotation for smooth inertia
  const starsRef = useRef([]);
  const hasMovedMouseRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const SQRT_3 = Math.sqrt(3);
    const STAR_COUNT = 70; // High-performance background star density, complemented by 3D WebGL planets
    const shipSize = 35; // Sleek and background-friendly size

    // Initialize dimensions
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let maxDim = Math.max(width, height);

    // Initial positions (pointing coolly to the right on load)
    positionRef.current = { x: width / 2, y: height / 2 };
    mousePosRef.current = { x: width / 2 + width / 4, y: height / 2 - 100 };
    currentAngleRef.current = Math.atan2(-100, width / 4) + Math.PI / 2;

    // Premium unified star designs with spherical 3D shading coordinates (elegant silver-white stars)
    const STAR_TYPES = [
      { base: '#ffffff', shadow: '#1e293b', glow: 'rgba(255, 255, 255, 0.85)', hasRing: false },
      { base: '#f1f5f9', shadow: '#334155', glow: 'rgba(241, 245, 249, 0.75)', hasRing: false },
      { base: '#e2e8f0', shadow: '#475569', glow: 'rgba(226, 232, 240, 0.65)', hasRing: false }
    ];

    // Build the starry sky where stars have fixed base positions and twinkle individually!
    const buildStars = () => {
      const stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        // Slightly larger than original stars to make the gorgeous 3D shading clearly visible
        const isLarge = Math.random() > 0.8;
        const radius = isLarge
          ? (Math.random() * 3.8 + 3.0)  // 20% larger planets (3.0px to 6.8px)
          : (Math.random() * 1.5 + 1.2); // 80% small/medium planets (1.2px to 2.7px)

        // Scale is proportional to radius (so larger stars shift faster!)
        const scale = ((radius - 1.2) / 5.6) * 1.0 + 0.15;

        // Choose a random star design
        const design = STAR_TYPES[Math.floor(Math.random() * STAR_TYPES.length)];

        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: radius,
          phase: Math.random() * Math.PI * 2, // Random starting phase for twinkling
          twinkleSpeed: 0.006 + Math.random() * 0.014, // Smooth, slow shimmering speeds
          scale: scale, // Parallax depth scale
          planetColor: design.base,
          planetShadow: design.shadow,
          planetGlow: design.glow,
          hasRing: design.hasRing,
          ringColor: 'rgba(255, 255, 255, 0.2)', // beautiful soft white ring
          ringAngle: -Math.PI / 6 - Math.random() * (Math.PI / 12) // tilted angle
        });
      }
      starsRef.current = stars;
    };

    buildStars();

    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      maxDim = Math.max(width, height);
      
      // Re-center ship on resize
      positionRef.current = { x: width / 2, y: height / 2 };
      if (!hasMovedMouseRef.current) {
        mousePosRef.current = { x: width / 2 + width / 4, y: height / 2 - 100 };
      }
      buildStars();
    };
    window.addEventListener('resize', handleResize);

    // Mouse & Touch tracking
    const handleMouseMove = (event) => {
      const e = (event.touches && event.touches[0]) || event;
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      hasMovedMouseRef.current = true;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleMouseMove, { passive: true });

    // Map helper
    const mapRange = (value, inMin, inMax, outMin, outMax) => {
      return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
    };

    let animationFrameId;

    // High performance render loop
    const tick = () => {
      // 1. Smoothly transition ship virtual position towards mouse (Exponential decay / Lerp factor 0.09)
      const pos = positionRef.current;
      const mousePos = mousePosRef.current;

      const shipVelocityX = (mousePos.x - pos.x) * 0.09;
      const shipVelocityY = (mousePos.y - pos.y) * 0.09;

      pos.x += shipVelocityX;
      pos.y += shipVelocityY;

      // 2. Clear canvas with full transparency
      ctx.clearRect(0, 0, width, height);

      // 3. Update and draw twinkling 3D planet stars scrolling dynamically opposite to ship flight velocity
      const stars = starsRef.current;
      stars.forEach(star => {
        // Increment phase for smooth sine-wave twinkling shimmer
        star.phase += star.twinkleSpeed;
        const alpha = 0.35 + 0.65 * Math.abs(Math.sin(star.phase));

        // Move stars continuously in the exact opposite direction of ship's velocity (scaled by star depth layer)
        star.x -= shipVelocityX * star.scale * 2.2;
        star.y -= shipVelocityY * star.scale * 2.2;

        // Wrap around screen boundaries cleanly to keep the star field endless and infinite
        const padding = star.radius * 3.5; // padding for rings and glows
        if (star.x > width + padding) star.x = -padding;
        if (star.x < -padding) star.x = width + padding;
        if (star.y > height + padding) star.y = -padding;
        if (star.y < -padding) star.y = height + padding;

        ctx.save();
        ctx.globalAlpha = alpha;

        // 1) Render planet's Saturn-like ring (if applicable)
        if (star.hasRing) {
          ctx.strokeStyle = star.ringColor;
          ctx.lineWidth = star.radius * 0.26;
          ctx.beginPath();
          ctx.ellipse(
            star.x,
            star.y,
            star.radius * 1.9,
            star.radius * 0.48,
            star.ringAngle,
            0,
            Math.PI * 2
          );
          ctx.stroke();
        }

        // 2) Render planet's atmospheric glow
        ctx.shadowBlur = star.radius * 1.6;
        ctx.shadowColor = star.planetGlow;

        // 3) Create beautiful 3D sphere gradient using specular lighting (offset towards top-left)
        const grad = ctx.createRadialGradient(
          star.x - star.radius * 0.3,
          star.y - star.radius * 0.3,
          star.radius * 0.04,
          star.x,
          star.y,
          star.radius
        );

        grad.addColorStop(0, '#ffffff'); // Shiny specular light point reflection
        grad.addColorStop(0.2, star.planetColor);
        grad.addColorStop(0.7, star.planetColor);
        grad.addColorStop(0.95, star.planetShadow); // Shaded sphere terminator
        grad.addColorStop(1, '#030303'); // Outer rim shadow

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // 5. Physics and Math for Spaceship (Triangle) & Thruster Flame
      // Calculate target angle and distance relative to the ship's current floating coordinates (pos) rather than static center
      const shipDx = mousePos.x - pos.x;
      const shipDy = mousePos.y - pos.y;
      const dist = Math.sqrt(shipDx * shipDx + shipDy * shipDy);
      
      // Calculate target angle and apply smooth rotation lerping (inertia)
      const targetAngle = Math.atan2(shipDy, shipDx) + Math.PI / 2;
      let angleDiff = targetAngle - currentAngleRef.current;
      
      // Normalize angle difference to avoid awkward 360-degree flip spinning
      angleDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));
      
      // Ship rotation tracking (lerp factor 0.09) to keep flight highly interactive and immediate
      currentAngleRef.current += angleDiff * 0.09;
      const drawAngle = currentAngleRef.current;

      // Flame sizing & subtle dynamic flicker based on distance to cursor (speed)
      const flameBaseSize = shipSize / SQRT_3;
      const flameLength = mapRange(Math.min(dist, maxDim / 2), 0, maxDim / 2, (2 * flameBaseSize) / 3, flameBaseSize * 1.3);

      // Render Thruster Exhaust Flame (fluctuates dynamically backwards behind the ship's floating position)
      ctx.save();
      ctx.translate(pos.x, pos.y);
      ctx.rotate(drawAngle);

      const flameLeftX = -shipSize / 3.5;
      const flameLeftY = (shipSize * 0.4) / SQRT_3;
      const flameRightX = shipSize / 3.5;
      const flameRightY = (shipSize * 0.4) / SQRT_3;

      // Flame tip flickers organically in a tiny range
      const flameTipX = Math.random() * (flameRightX - flameLeftX) + flameLeftX;
      const flameTipY = flameLength + Math.random() * 3;

      ctx.fillStyle = '#FCE589'; // Bright glowing flame gold
      ctx.beginPath();
      ctx.moveTo(flameTipX, flameTipY);
      ctx.lineTo(flameLeftX, flameLeftY);
      ctx.lineTo(flameRightX, flameRightY);
      ctx.closePath();
      ctx.fill();

      // Render Ship body (Triangle) at the floating position
      ctx.fillStyle = '#FF7885'; // Coral-pink fuselage
      ctx.beginPath();
      ctx.moveTo(0, -shipSize / SQRT_3); // Fuselage nose (pointing forward)
      ctx.lineTo(-shipSize / 2, (shipSize * 0.5) / SQRT_3); // Port wingtip
      ctx.lineTo(shipSize / 2, (shipSize * 0.5) / SQRT_3); // Starboard wingtip
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
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
        pointerEvents: 'none', // Lets user clicks pass through to sections below
        zIndex: 0,             // Sits behind content, above standard dark backgrounds
      }}
    />
  );
};

export default SpaceShipBackground;
