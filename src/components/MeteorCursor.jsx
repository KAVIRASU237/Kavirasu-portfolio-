import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

const MeteorCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 2500, mass: 0.05 };
  const mainX = useSpring(mouseX, springConfig);
  const mainY = useSpring(mouseY, springConfig);

  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 10000 }}>
      <style>{`
        html, body, a, button, [role="button"], .hover {
          cursor: none !important;
        }
      `}</style>
      
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Yellow Arrow Head */}
            <motion.div
              style={{
                position: "fixed",
                width: 24,
                height: 24,
                x: mainX,
                y: mainY,
                translateX: "-50%",
                translateY: "-50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                filter: "drop-shadow(0 0 5px #fff000)",
                willChange: "transform",
              }}
              animate={{
                scale: isClicking ? 0.8 : 1,
                rotate: isClicking ? 45 : 0,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" style={{ transform: "rotate(-45deg) translate(2px, 2px)" }}>
                <path 
                  d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" 
                  fill="#fff000" 
                  stroke="#fff" 
                  strokeWidth="0.5"
                />
              </svg>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MeteorCursor;
