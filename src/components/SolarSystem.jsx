import React, { useState, useEffect } from 'react';
import './SolarSystem.css';

const SolarSystem = () => {
  const [view3D, setView3D] = useState(true);
  const [zoomLarge, setZoomLarge] = useState(true);
  const [scaleMode, setScaleMode] = useState('stretched'); // 'stretched', 'd', 's'
  const [activePlanet, setActivePlanet] = useState('earth');
  const [controlsOpen, setControlsOpen] = useState(false);
  const [dataOpen, setDataOpen] = useState(false);
  const [uiHidden, setUiHidden] = useState(true);
  const [isOpening, setIsOpening] = useState(true);
  const [infoCategory, setInfoCategory] = useState('speed'); // 'speed', 'size', 'distance'

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpening(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleView = () => setView3D(!view3D);
  const toggleZoom = () => setZoomLarge(!zoomLarge);
  
  const handleScaleChange = (mode) => {
    setScaleMode(mode);
    if (mode === 'stretched') {
      setInfoCategory('speed');
    } else if (mode === 'd') {
      setInfoCategory('distance');
    } else if (mode === 's') {
      setInfoCategory('size');
    }
  };

  const handlePlanetSelect = (planet) => {
    setActivePlanet(planet);
  };

  const containerClass = [
    'solar-system-container',
    view3D ? 'view-3D' : 'view-2D',
    zoomLarge ? 'zoom-large' : 'zoom-close',
    `scale-${scaleMode}`,
    `set-${infoCategory}`,
    dataOpen ? 'data-open' : 'data-close',
    controlsOpen ? 'controls-open' : 'controls-close',
    uiHidden ? 'hide-UI' : '',
    activePlanet ? activePlanet : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClass}>
      <div id="universe" className={isOpening ? 'opening' : ''}>
        <div id="galaxy">
          <div id="solar-system" className={activePlanet}>
            
            <div id="sun" onClick={() => handlePlanetSelect('sun')}>
              <dl className="infos">
                <dt>Sun</dt>
                <dd><span></span></dd>
              </dl>
            </div>

            <div id="mercury" className="orbit">
              <div className="pos">
                <div className="planet" onClick={() => handlePlanetSelect('mercury')}>
                  <dl className="infos">
                    <dt>Mercury</dt>
                    <dd><span></span></dd>
                  </dl>
                </div>
              </div>
            </div>

            <div id="venus" className="orbit">
              <div className="pos">
                <div className="planet" onClick={() => handlePlanetSelect('venus')}>
                  <dl className="infos">
                    <dt>Venus</dt>
                    <dd><span></span></dd>
                  </dl>
                </div>
              </div>
            </div>

            <div id="earth" className="orbit">
              <div className="pos">
                <div className="planet" onClick={() => handlePlanetSelect('earth')}>
                  <dl className="infos">
                    <dt>Earth</dt>
                    <dd><span></span></dd>
                  </dl>
                </div>
                <div className="orbit moon">
                  <div className="pos">
                    <div className="moon"></div>
                  </div>
                </div>
              </div>
            </div>

            <div id="mars" className="orbit">
              <div className="pos">
                <div className="planet" onClick={() => handlePlanetSelect('mars')}>
                  <dl className="infos">
                    <dt>Mars</dt>
                    <dd><span></span></dd>
                  </dl>
                </div>
              </div>
            </div>

            <div id="jupiter" className="orbit">
              <div className="pos">
                <div className="planet" onClick={() => handlePlanetSelect('jupiter')}>
                  <dl className="infos">
                    <dt>Jupiter</dt>
                    <dd><span></span></dd>
                  </dl>
                </div>
              </div>
            </div>

            <div id="saturn" className="orbit">
              <div className="pos">
                <div className="planet" onClick={() => handlePlanetSelect('saturn')}>
                  <div className="ring"></div>
                  <dl className="infos">
                    <dt>Saturn</dt>
                    <dd><span></span></dd>
                  </dl>
                </div>
              </div>
            </div>

            <div id="uranus" className="orbit">
              <div className="pos">
                <div className="planet" onClick={() => handlePlanetSelect('uranus')}>
                  <dl className="infos">
                    <dt>Uranus</dt>
                    <dd><span></span></dd>
                  </dl>
                </div>
              </div>
            </div>

            <div id="neptune" className="orbit">
              <div className="pos">
                <div className="planet" onClick={() => handlePlanetSelect('neptune')}>
                  <dl className="infos">
                    <dt>Neptune</dt>
                    <dd><span></span></dd>
                  </dl>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Toggle Controls Button */}
      <button 
        id="toggle-ui-btn" 
        onClick={() => setUiHidden(!uiHidden)}
        title="Toggle Interactive 3D Solar System Panels"
      >
        {uiHidden ? "Explore Solar System" : "Back to Portfolio"}
      </button>

      {/* Navbar Panel */}
      <div id="navbar">
        <a 
          id="toggle-data" 
          onClick={() => {
            setDataOpen(!dataOpen);
            setControlsOpen(false);
          }}
          className={dataOpen ? 'active' : ''}
        >
          Data Panel
        </a>
        <h1 className="solar-title">
          3D Solar System<br />
          <span>React Edition</span>
        </h1>
        <a 
          id="toggle-controls" 
          onClick={() => {
            setControlsOpen(!controlsOpen);
            setDataOpen(false);
          }}
          className={controlsOpen ? 'active' : ''}
        >
          Controls
        </a>
      </div>

      {/* Data Left Menu Panel */}
      <div id="data">
        {['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'].map((planet) => (
          <a
            key={planet}
            className={`${planet} ${activePlanet === planet ? 'active' : ''}`}
            title={planet}
            onClick={() => handlePlanetSelect(planet)}
          >
            {planet.charAt(0).toUpperCase() + planet.slice(1)}
          </a>
        ))}
      </div>

      {/* Controls Right Panel */}
      <div id="controls">
        <label className="set-view">
          <input 
            type="checkbox" 
            checked={view3D} 
            onChange={toggleView} 
          />
          <span>3D View</span>
        </label>
        <label className="set-zoom">
          <input 
            type="checkbox" 
            checked={zoomLarge} 
            onChange={toggleZoom} 
          />
          <span>Large Scale</span>
        </label>
        
        <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px' }}>
          <h2 style={{ fontSize: '11px', color: '#888', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Scale Modes
          </h2>
          <label style={{ marginBottom: '12px' }}>
            <input 
              type="radio" 
              name="scale" 
              checked={scaleMode === 'stretched'} 
              onChange={() => handleScaleChange('stretched')} 
            />
            <span>Liquid (Default)</span>
          </label>
          <label style={{ marginBottom: '12px' }}>
            <input 
              type="radio" 
              name="scale" 
              checked={scaleMode === 'd'} 
              onChange={() => handleScaleChange('d')} 
            />
            <span>Distance Scale</span>
          </label>
          <label style={{ marginBottom: '12px' }}>
            <input 
              type="radio" 
              name="scale" 
              checked={scaleMode === 's'} 
              onChange={() => handleScaleChange('s')} 
            />
            <span>Size Scale</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SolarSystem;
