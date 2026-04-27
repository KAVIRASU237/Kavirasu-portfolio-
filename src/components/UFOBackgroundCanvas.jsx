import React, { useEffect, useRef } from 'react';

const UFOBackgroundCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Handle high DPI screens
    const dpr = window.devicePixelRatio || 1;
    const isMobile = window.innerWidth < 768;
    const scaleFactor = isMobile ? 0.8 : 1;

    const ufo = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 3,
      dx: (Math.random() * 1.5 + 0.5) * (Math.random() < 0.5 ? -1 : 1),
      dy: (Math.random() * 1.5 + 0.5) * (Math.random() < 0.5 ? -1 : 1),
      angle: 0,
      rotationSpeed: (Math.random() - 0.5) * 0.02
    };

    let randomGlow = 0;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    const updateUFO = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ufo.x += ufo.dx;
      ufo.y += ufo.dy;

      // Bounce
      if (ufo.x < 30) { ufo.x = 30; ufo.dx *= -1; }
      if (ufo.x > width - 30) { ufo.x = width - 30; ufo.dx *= -1; }
      if (ufo.y < 30) { ufo.y = 30; ufo.dy *= -1; }
      if (ufo.y > height - 30) { ufo.y = height - 30; ufo.dy *= -1; }

      ufo.angle += ufo.rotationSpeed;
      ufo.rotationSpeed *= 0.995;
    };

    const drawBeam = () => {
      randomGlow += (Math.random() - 0.5) * 0.1;
      randomGlow = Math.max(0, Math.min(1, randomGlow));

      const beamWidth = (10 + randomGlow * 15) * scaleFactor;
      const intensity = 0.2 + randomGlow * 0.4;
      const beamHeight = (80 + randomGlow * 40) * scaleFactor;

      ctx.save();
      ctx.translate(ufo.x, ufo.y);
      ctx.rotate(ufo.angle);

      const grad = ctx.createLinearGradient(0, 0, 0, beamHeight);
      grad.addColorStop(0, `rgba(255, 255, 180, ${intensity})`);
      grad.addColorStop(1, 'transparent');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(-beamWidth * 0.3, 0);
      ctx.lineTo(beamWidth * 0.3, 0);
      ctx.lineTo(beamWidth, beamHeight);
      ctx.lineTo(-beamWidth, beamHeight);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawUFO = () => {
      ctx.save();
      ctx.translate(ufo.x, ufo.y);
      ctx.rotate(ufo.angle);
      
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#f2e107";
      ctx.fillStyle = "#f2e107";

      // body
      ctx.beginPath();
      ctx.ellipse(0, 0, 14 * scaleFactor, 5 * scaleFactor, 0, 0, Math.PI * 2);
      ctx.fill();

      // dome
      ctx.beginPath();
      ctx.ellipse(0, -3 * scaleFactor, 6 * scaleFactor, 4 * scaleFactor, 0, Math.PI, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    let animationFrameId;
    const loop = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      updateUFO();
      drawBeam();
      drawUFO();
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
        zIndex: 1, // Above stars, below content
      }}
    />
  );
};

export default UFOBackgroundCanvas;
