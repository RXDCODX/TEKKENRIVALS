import React, { useState, useRef, useEffect } from 'react';

interface SplashScreenProps {
  onAnimationComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isWaitingForInteraction, setIsWaitingForInteraction] = useState(true);
  const [shouldStartTransition, setShouldStartTransition] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0, scale: 1 });
  const logoRef = useRef<HTMLImageElement>(null);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);

  const prepareTransition = () => {
    if (isAnimating) return; // Предотвращаем повторный запуск
    
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
    
    setIsWaitingForInteraction(false);
    setShouldStartTransition(true);
  };

  const startBackgroundMusic = () => {
    try {
      // Создаем аудио элемент для фоновой музыки
      const audio = new Audio('./sr.wav');
      audio.volume = 0.25;
      audio.loop = true;
      audio.preload = 'auto';
      
      // Загружаем и воспроизводим
      audio.load();
      audio.play().then(() => {
        console.log('✅ Фоновая музыка sr.wav запущена в цикле');
        backgroundMusicRef.current = audio;
      }).catch(error => {
        console.warn('⚠️ Не удалось запустить фоновую музыку:', error);
      });
    } catch (error) {
      console.warn('⚠️ Ошибка создания фоновой музыки:', error);
    }
  };

  const startTransition = async () => {
    // Воспроизводим звук при начале анимации перехода
    await playSound();
    
    setIsAnimating(true);
    
    // Через 3 секунды после начала анимации скрываем заставку и запускаем фоновую музыку
    setTimeout(() => {
      setIsVisible(false);
      startBackgroundMusic(); // Запускаем фоновую музыку
      onAnimationComplete();
    }, 3000);
  };

  const playSound = async () => {
    try {
      // Создаем новый аудио элемент для каждого воспроизведения
      const audio = new Audio('./announcer.mp3');
      audio.volume = 0.25;
      audio.preload = 'auto';
      
      // Ждем загрузки
      await new Promise((resolve, reject) => {
        audio.addEventListener('canplaythrough', resolve, { once: true });
        audio.addEventListener('error', reject, { once: true });
        audio.load();
      });
      
      // Воспроизводим
      await audio.play();
      console.log('✅ Звук announcer.mp3 воспроизведен успешно');
    } catch (error) {
      console.warn('⚠️ Не удалось воспроизвести звук announcer.mp3:', error);
    }
  };

  const handleInteraction = () => {
    if (isWaitingForInteraction) {
      prepareTransition();
    }
  };

  const handleAnimationEnd = (event: React.AnimationEvent) => {
    // Проверяем, что это анимация logoFloat и мы готовы к переходу
    if (event.animationName === 'logoFloat' && shouldStartTransition) {
      startTransition();
    }
  };


  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className={`splash-screen ${
        isAnimating ? 'animating' : 
        shouldStartTransition ? 'preparing' : 
        isWaitingForInteraction ? 'waiting' : ''
      }`}
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
    >
      
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
          onAnimationEnd={handleAnimationEnd}
        />
      </div>
      
      {(isWaitingForInteraction || shouldStartTransition) && (
        <div className="splash-hint">
          <p>{isWaitingForInteraction ? 'Нажмите для продолжения' : 'Подготовка...'}</p>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
