import React, { useRef, ReactNode, useState, useEffect, useCallback } from 'react';
import { AudioContext, AudioContextType } from './AudioContextDefinition';

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true); // По умолчанию выключен
  const [isSplashActive, setIsSplashActive] = useState(true); // По умолчанию splash активен

  // Инициализация состояния из localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('audioEnabled');
    console.log('🔊 Инициализация из localStorage:', savedState);
    if (savedState !== null) {
      const audioEnabled = JSON.parse(savedState);
      console.log('🔊 audioEnabled из localStorage:', audioEnabled, 'устанавливаем isMuted:', !audioEnabled);
      setIsMuted(!audioEnabled);
    } else {
      // По умолчанию выключен
      console.log('🔊 Состояние по умолчанию: выключен');
      setIsMuted(true);
    }
  }, []);

  // Инициализация аудио элемента без автовоспроизведения
  useEffect(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.muted = isMuted;
      backgroundMusicRef.current.volume = 0.3;
      // Не пытаемся воспроизводить автоматически - только после взаимодействия пользователя
    }
  }, [isMuted]); // Только при инициализации

  // Отдельный useEffect для обработки изменений состояния
  useEffect(() => {
    console.log('🔊 useEffect сработал:', { isSplashActive, isMuted, hasAudio: !!backgroundMusicRef.current });
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
    console.log('🔊 unmuteBackgroundMusic вызван, isSplashActive:', isSplashActive);
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.muted = false;
      setIsMuted(false);
      localStorage.setItem('audioEnabled', 'true');
    } else {
      setIsMuted(false);
      localStorage.setItem('audioEnabled', 'true');
    }
  }, [isSplashActive]);

  const setBackgroundMusic = useCallback((audio: HTMLAudioElement) => {
    backgroundMusicRef.current = audio;
    // Применяем текущее состояние к новому аудио элементу
    if (audio) {
      audio.muted = isMuted;
      audio.volume = 0.3;
      // Не пытаемся воспроизводить автоматически - только после взаимодействия пользователя
    }
  }, [isMuted]);

  const setSplashActive = useCallback((active: boolean) => {
    setIsSplashActive(active);
    // Логика воспроизведения теперь в отдельном useEffect
  }, []);

  const value: AudioContextType = {
    backgroundMusic: backgroundMusicRef.current,
    muteBackgroundMusic,
    unmuteBackgroundMusic,
    isMuted,
    setBackgroundMusic,
    setSplashActive,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};
