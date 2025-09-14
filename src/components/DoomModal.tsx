import React, { useEffect } from 'react';
import './DoomModal.scss';
import { useAudio } from '../hooks/useAudio';

interface DoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DoomModal: React.FC<DoomModalProps> = ({ isOpen, onClose }) => {
  const { muteBackgroundMusic } = useAudio();

  // Управляем звуком при открытии/закрытии модального окна
  useEffect(() => {
    console.log('🔊 DoomModal useEffect, isOpen:', isOpen);
    if (isOpen) {
      muteBackgroundMusic();
    } else {
      // Не включаем звук автоматически при закрытии модального окна
      // Пользователь должен сам включить звук через кнопку
      console.log('🔊 DoomModal закрыт, звук не включаем автоматически');
    }
  }, [isOpen, muteBackgroundMusic]);

  const handleFullscreen = () => {
    const iframe = document.getElementById('doom-iframe') as HTMLIFrameElement;
    if (iframe && iframe.requestFullscreen) {
      iframe.requestFullscreen();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="doom-modal-overlay" onClick={onClose}>
      <div className="doom-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="doom-modal-header">
          <h2>DOOM - Веб версия</h2>
          <button className="doom-modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="doom-modal-body">
          <iframe
            id="doom-iframe"
            src="https://doom-emulator.yeet.su/dos.html"
            className="doom-iframe"
            title="DOOM Emulator"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
          />
          <div className="doom-controls">
            <button onClick={handleFullscreen} className="doom-fullscreen-btn">
              Сделать полноэкранным
            </button>
            <div className="doom-instructions">
              <p>DOOM веб-эмулятор загружается...</p>
              <p>Стрелки для движения, Пробел для использования, Ctrl для стрельбы</p>
              <a 
                href="http://doom.wikia.com/wiki/Controls" 
                target="_blank" 
                rel="noopener noreferrer"
                className="doom-controls-link"
              >
                Больше управлений
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoomModal;
