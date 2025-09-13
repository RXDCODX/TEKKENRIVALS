import React, { useState, useEffect, useRef } from 'react';

interface SplashScreenProps {
  onAnimationComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0, scale: 1 });
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Через 2 секунды начинаем анимацию
    const timer = setTimeout(() => {
      // Находим реальную позицию логотипа в header
      const headerLogo = document.querySelector('.logo-animation') as HTMLElement;
      if (headerLogo && logoRef.current) {
        const rect = headerLogo.getBoundingClientRect();
        const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        const targetX = scrollX + rect.left;
        const targetY = scrollY + rect.top;
        
        // Рассчитываем масштаб (размер логотипа в header относительно заставки)
        const headerLogoWidth = rect.width;
        const splashLogoWidth = logoRef.current.offsetWidth;
        const scale = headerLogoWidth / splashLogoWidth;
        
        setTargetPosition({ x: targetX, y: targetY, scale });
      }
      
      setIsAnimating(true);
      
      // Через 3 секунды после начала анимации скрываем заставку
      setTimeout(() => {
        setIsVisible(false);
        onAnimationComplete();
      }, 3000);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`splash-screen ${isAnimating ? 'animating' : ''}`}>
      <div 
        className="splash-logo-container"
        style={isAnimating ? {
          '--target-x': `${targetPosition.x}px`,
          '--target-y': `${targetPosition.y}px`,
          '--target-scale': targetPosition.scale
        } as React.CSSProperties : {}}
      >
        <img 
          ref={logoRef}
          src="./logo_animation_mini1.gif" 
          alt="TEKKEN RIVALS Logo" 
          className="splash-logo"
        />
      </div>
    </div>
  );
};

export default SplashScreen;
