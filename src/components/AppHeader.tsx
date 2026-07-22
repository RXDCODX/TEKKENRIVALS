import React from 'react';

interface AppHeaderProps {
  onDataRefresh?: () => void;
  isLoading?: boolean;
  isSplashActive?: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({ isSplashActive = false }) => {
  return (
    <header className='app-header'>
      <div className='logo-container'>
        <a
          href='https://discord.gg/HhNVKBuM8A'
          target='_blank'
          rel='noopener noreferrer'
          className='logo-link'
        >
          <img
            src='./logo_animation_mini1.gif'
            alt='TEKKEN RIVALS Logo'
            className={`logo-animation ${isSplashActive ? 'paused' : 'playing'}`}
          />
        </a>
      </div>
    </header>
  );
};

export default AppHeader;
