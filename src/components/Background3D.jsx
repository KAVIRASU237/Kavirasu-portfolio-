import React, { useEffect, useState } from 'react';
import './Background3D.css';
import UFOBackgroundCanvas from './UFOBackgroundCanvas';
import SatelliteBackground from './SatelliteBackground';
import SpaceShipBackground from './SpaceShipBackground';
import PlanetBackground3D from './PlanetBackground3D';



const Meteors = () => {
    const [meteors, setMeteors] = useState([]);
  
    useEffect(() => {
      const spawnMeteor = () => {
        const id = Math.random();
        const colors = ['#FFFF00', '#FFFFFF', '#FFA500', '#FF4500'];
        
        const side = Math.floor(Math.random() * 3);
        let top, left, angle;
  
        if (side === 0) { // Top
          top = '-5%';
          left = Math.random() * 100 + '%';
          angle = '45deg';
        } else if (side === 1) { // Right
          top = Math.random() * 50 + '%';
          left = '105%';
          angle = '225deg';
        } else { // Left
          top = Math.random() * 50 + '%';
          left = '-5%';
          angle = '45deg';
        }
  
        const newMeteor = {
          id,
          top,
          left,
          color: colors[Math.floor(Math.random() * colors.length)],
          angle,
        };
        setMeteors(prev => [...prev, newMeteor]);
        setTimeout(() => {
          setMeteors(prev => prev.filter(m => m.id !== id));
        }, 2000);
      };
  
      const interval = setInterval(spawnMeteor, 5000);
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="meteors-layer">
        {meteors.map(m => (
          <div
            key={m.id}
            className="meteor"
            style={{
              top: m.top,
              left: m.left,
              '--meteor-color': m.color,
              '--meteor-angle': m.angle,
            }}
          />
        ))}
      </div>
    );
  };

const generateStars = (count) => {
  let stars = "";
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2000);
    const y = Math.floor(Math.random() * 2000);
    const colors = ["#FFF", "#E2E8F0", "#F1F5F9", "#FFF"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    stars += `${x}px ${y}px ${color}${i === count - 1 ? "" : ","}`;
  }
  return stars;
};

const StarLayer = ({ count, size, duration, glow }) => {
  const [starsShadow, setStarsShadow] = useState("");
  // Fixed randomized values for this instance
  const [twinkleData] = useState({
    duration: (Math.random() * 3 + 2).toFixed(2),
    delay: (Math.random() * 5).toFixed(2)
  });

  useEffect(() => {
    setStarsShadow(generateStars(count));
  }, [count]);

  return (
    <div
      className="stars-layer"
      style={{
        width: size + "px",
        height: size + "px",
        boxShadow: starsShadow,
        animation: `animStar ${duration}s linear infinite, twinkle ${twinkleData.duration}s ease-in-out ${twinkleData.delay}s infinite`,
        filter: glow ? `drop-shadow(0 0 ${glow}px #f2e107)` : "none",
      }}
    />
  );
};

const Background3D = () => {
  return (
    <div className="anime-background">
      <PlanetBackground3D />
      <SpaceShipBackground />
      <SatelliteBackground />
      <UFOBackgroundCanvas />
      <Meteors />
      <div className="nebula"></div>
      <div className="glow-overlay"></div>
      <div className="background-dimmer"></div>
    </div>
  );
};

export default Background3D;
