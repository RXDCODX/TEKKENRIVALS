import React, { useRef, ReactNode } from 'react';
import { AudioContext, AudioContextType } from './AudioContextDefinition';

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const isMutedRef = useRef(false);

  const muteBackgroundMusic = () => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.muted = true;
      isMutedRef.current = true;
      console.log('🔇 Фоновая музыка приглушена');
    } else {
      // Если аудио не найдено в контексте, ищем его в DOM
      const existingAudio = document.querySelector('audio[src="./sr.wav"]') as HTMLAudioElement;
      if (existingAudio) {
        existingAudio.muted = true;
        isMutedRef.current = true;
        console.log('🔇 Фоновая музыка приглушена (найдена в DOM)');
      }
    }
  };

  const unmuteBackgroundMusic = () => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.muted = false;
      isMutedRef.current = false;
      console.log('🔊 Фоновая музыка включена');
    } else {
      // Если аудио не найдено в контексте, ищем его в DOM
      const existingAudio = document.querySelector('audio[src="./sr.wav"]') as HTMLAudioElement;
      if (existingAudio) {
        existingAudio.muted = false;
        isMutedRef.current = false;
        console.log('🔊 Фоновая музыка включена (найдена в DOM)');
      }
    }
  };

  const setBackgroundMusic = (audio: HTMLAudioElement) => {
    backgroundMusicRef.current = audio;
  };

  const value: AudioContextType = {
    backgroundMusic: backgroundMusicRef.current,
    muteBackgroundMusic,
    unmuteBackgroundMusic,
    isMuted: isMutedRef.current,
    setBackgroundMusic,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};
