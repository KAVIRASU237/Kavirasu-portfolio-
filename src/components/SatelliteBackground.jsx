import React, { useEffect, useRef } from 'react';

const SatelliteBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const dpr = window.devicePixelRatio || 1;
    const isMobile = window.innerWidth < 768;
    const scaleFactor = isMobile ? 0.7 : 1;

    const createSatellite = () => {
      const fromLeft = Math.random() < 0.5;
      return {
        x: fromLeft ? -100 : window.innerWidth + 100,
        y: Math.random() * window.innerHeight,
        dx: fromLeft ? (Math.random() * 0.4 + 0.2) : -(Math.random() * 0.4 + 0.2),
        dy: (Math.random() - 0.5) * 0.2,
        angle: Math.random() * Math.PI,
        rotationSpeed: (Math.random() - 0.5) * 0.005,
        glow: Math.random()
      };
    };

    let sat = createSatellite();

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    const updateSat = () => {
      sat.x += sat.dx;
      sat.y += sat.dy;
      sat.angle += sat.rotationSpeed;
      sat.glow += (Math.random() - 0.5) * 0.05;
      sat.glow = Math.max(0, Math.min(1, sat.glow));

      if (
        sat.x < -200 || sat.x > window.innerWidth + 200 ||
        sat.y < -200 || sat.y > window.innerHeight + 200
      ) {
        sat = createSatellite();
      }
    };

    const drawSatellite = () => {
      ctx.save();
      ctx.translate(sat.x, sat.y);
      ctx.rotate(sat.angle);

      ctx.shadowBlur = 8;
      ctx.shadowColor = "rgba(255, 255, 255, 0.3)";

      // body
      ctx.fillStyle = "white";
      ctx.fillRect(-8 * scaleFactor, -8 * scaleFactor, 16 * scaleFactor, 16 * scaleFactor);

      // antenna
      ctx.strokeStyle = "#f2e107";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -8 * scaleFactor);
      ctx.lineTo(0, -20 * scaleFactor);
      ctx.stroke();

      // panels
      const g = 0.4 + sat.glow * 0.6;
      const grad = ctx.createLinearGradient(-60 * scaleFactor, 0, 60 * scaleFactor, 0);
      grad.addColorStop(0, `rgba(242, 225, 7, ${g})`);
      grad.addColorStop(1, `rgba(242, 225, 7, ${g})`);

      ctx.fillStyle = grad;
      ctx.fillRect(-60 * scaleFactor, -5 * scaleFactor, 45 * scaleFactor, 10 * scaleFactor);
      ctx.fillRect(15 * scaleFactor, -5 * scaleFactor, 45 * scaleFactor, 10 * scaleFactor);

      ctx.restore();
    };

    let animationFrameId;
    const loop = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      updateSat();
      drawSatellite();
      animationFrameId = requestAnimationFrame(loop);
    };


    resize();
    window.addEventListener('resize', resize);
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0, // Behind UFO
      }}
    />
  );
};

export default SatelliteBackground;
