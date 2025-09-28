import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AudioContext, AudioContextType } from './AudioContextDefinition';

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true); // По умолчанию выключен
  const [isSplashActive, setIsSplashActive] = useState(true); // По умолчанию splash активен
  const [volume, setVolumeState] = useState(0.3); // Громкость по умолчанию

  // Инициализация состояния из localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('audioEnabled');
    const savedVolume = localStorage.getItem('audioVolume');
    console.log(
      '🔊 Инициализация из localStorage:',
      savedState,
      'volume:',
      savedVolume
    );

    if (savedState !== null) {
      const audioEnabled = JSON.parse(savedState);
      console.log(
        '🔊 audioEnabled из localStorage:',
        audioEnabled,
        'устанавливаем isMuted:',
        !audioEnabled
      );
      setIsMuted(!audioEnabled);
    } else {
      // По умолчанию выключен
      console.log('🔊 Состояние по умолчанию: выключен');
      setIsMuted(true);
    }

    if (savedVolume !== null) {
      const volumeValue = parseFloat(savedVolume);
      if (!isNaN(volumeValue) && volumeValue >= 0 && volumeValue <= 1) {
        setVolumeState(volumeValue);
      }
    }
  }, []);

  // Инициализация аудио элемента без автовоспроизведения
  useEffect(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.muted = isMuted;
      backgroundMusicRef.current.volume = volume;
    }
  }, [isMuted, volume]);

  // Отдельный useEffect для обработки изменений состояния
  useEffect(() => {
    console.log('🔊 useEffect сработал:', {
      isSplashActive,
      isMuted,
      hasAudio: !!backgroundMusicRef.current,
    });
    if (backgroundMusicRef.current && !isSplashActive && !isMuted) {
      console.log('🔊 Запускаем воспроизведение из useEffect');
      // Запускаем воспроизведение только если splash завершен и звук включен
      backgroundMusicRef.current.play().catch(console.error);
    }
  }, [isSplashActive, isMuted]);

  const muteBackgroundMusic = useCallback(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.muted = true;
      backgroundMusicRef.current.pause();
      setIsMuted(true);
      localStorage.setItem('audioEnabled', 'false');
    } else {
      setIsMuted(true);
      localStorage.setItem('audioEnabled', 'false');
    }
  }, []);

  const unmuteBackgroundMusic = useCallback(() => {
    console.log(
      '🔊 unmuteBackgroundMusic вызван, isSplashActive:',
      isSplashActive
    );
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.muted = false;
      setIsMuted(false);
      localStorage.setItem('audioEnabled', 'true');
    } else {
      setIsMuted(false);
      localStorage.setItem('audioEnabled', 'true');
    }
  }, [isSplashActive]);

  const setBackgroundMusic = useCallback(
    (audio: HTMLAudioElement) => {
      backgroundMusicRef.current = audio;
      // Применяем текущее состояние к новому аудио элементу
      if (audio) {
        audio.muted = isMuted;
        audio.volume = volume;
        // Не пытаемся воспроизводить автоматически - только после взаимодействия пользователя
      }
    },
    [isMuted, volume]
  );

  const setSplashActive = useCallback((active: boolean) => {
    setIsSplashActive(active);
    // Логика воспроизведения теперь в отдельном useEffect
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
    localStorage.setItem('audioVolume', clampedVolume.toString());

    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = clampedVolume;
    }
  }, []);

  const value: AudioContextType = {
    backgroundMusic: backgroundMusicRef.current,
    muteBackgroundMusic,
    unmuteBackgroundMusic,
    isMuted,
    volume,
    setVolume,
    setBackgroundMusic,
    setSplashActive,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};
