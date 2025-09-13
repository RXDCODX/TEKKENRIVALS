import React from 'react';

interface AppHeaderProps {
  onDataRefresh?: () => void;
  isLoading?: boolean;
  isSplashActive?: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({ isSplashActive = false }) => {
  return (
    <header className="app-header">
      <div className="logo-container">
        <a 
          href="https://discord.gg/HhNVKBuM8A" 
          target="_blank" 
          rel="noopener noreferrer"
          className="logo-link"
        >
          <img 
            src="./logo_animation_mini1.gif" 
            alt="TEKKEN RIVALS Logo" 
            className={`logo-animation ${isSplashActive ? 'paused' : 'playing'}`}
          />
        </a>
      </div>
      <div className="logo-delimiter"></div>
      <div className="points-info">
        <div className="points-header">
          <h3>Система подсчета очков</h3>
        </div>
        <div className="points-grid">
          <span>1 место → 11 баллов</span>
          <span>2 место → 10 баллов</span>
          <span>3 место → 8 баллов</span>
          <span>4 место → 7 баллов</span>
          <span>5-6 место → 6 баллов</span>
          <span>7-8 место → 5 баллов</span>
          <span>9-12 место → 4 балла</span>
          <span>13-16 место → 3 балла</span>
          <span>17-32 место → 2 балла</span>
          <span>33+ место → 1 балл</span>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
