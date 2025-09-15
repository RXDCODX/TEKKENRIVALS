import React, { useState } from 'react';
import DoomModal from './DoomModal';

const CreatorsSection: React.FC = () => {
  const [isWoodweHovered, setIsWoodweHovered] = useState(false);
  const [isDoomModalOpen, setIsDoomModalOpen] = useState(false);

  return (
    <footer className='creators-section'>
      <div className='creators-container'>
        {/* Главный создатель */}
        <div className='main-creator-section'>
          <h3>Главный создатель</h3>
          <div className='creators-grid'>
            <div className='creator-card'>
              <div className='creator-avatar'>
                <img
                  src='./avicii75.webp'
                  alt='AVICII75'
                  className='creator-image'
                />
              </div>
              <div className='creator-info'>
                <h4>AVICII75</h4>
                <p>Главный создатель</p>
                <a
                  href='https://twitch.tv/AVICII75'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='creator-link'
                >
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 2400 2800'
                    style={{ marginRight: '4px', verticalAlign: 'middle' }}
                  >
                    <path
                      fill='#29ffa7'
                      d='M500,0L0,500v1800h600v500l500-500h400l900-900V0H500z M2200,1300l-400,400h-400l-350,350v-350H600V200h1600V1300z'
                    />
                    <rect
                      x='1700'
                      y='550'
                      fill='#29ffa7'
                      width='200'
                      height='600'
                    />
                    <rect
                      x='1150'
                      y='550'
                      fill='#29ffa7'
                      width='200'
                      height='600'
                    />
                  </svg>
                  Twitch
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Причастные */}
        <div className='contributors-section'>
          <h3>Причастные</h3>
          <div className='creators-grid contributors-grid'>
            <div
              className='creator-card clickable-card'
              onClick={() => setIsDoomModalOpen(true)}
              style={{ cursor: 'pointer' }}
            >
              <div className='creator-avatar'>
                <img
                  src='./rxdcodx.jpg'
                  alt='RXDCODX'
                  className='creator-image'
                />
              </div>
              <div className='creator-info'>
                <h4>RXDCODX</h4>
                <p>Верстальщик + Разработчик</p>
                <a
                  href='https://twitch.tv/rxdcodx'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='creator-link'
                  onClick={e => e.stopPropagation()}
                >
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 2400 2800'
                    style={{ marginRight: '4px', verticalAlign: 'middle' }}
                  >
                    <path
                      fill='#29ffa7'
                      d='M500,0L0,500v1800h600v500l500-500h400l900-900V0H500z M2200,1300l-400,400h-400l-350,350v-350H600V200h1600V1300z'
                    />
                    <rect
                      x='1700'
                      y='550'
                      fill='#29ffa7'
                      width='200'
                      height='600'
                    />
                    <rect
                      x='1150'
                      y='550'
                      fill='#29ffa7'
                      width='200'
                      height='600'
                    />
                  </svg>
                  Twitch
                </a>
              </div>
            </div>

            <div
              className='creator-card'
              onMouseEnter={() => setIsWoodweHovered(true)}
              onMouseLeave={() => setIsWoodweHovered(false)}
            >
              <div className='creator-avatar'>
                <img
                  src='./woodwe.png'
                  alt='WooDWE'
                  className='creator-image'
                />
              </div>
              <div className='creator-info'>
                <h4>WooDWE</h4>
                <p className='woodwe-role'>
                  {isWoodweHovered ? 'Долбоеб' : 'Degenesigner'}
                </p>
                <a
                  href='https://twitch.tv/woodwe'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='creator-link'
                >
                  <picture>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 2400 2800'
                      style={{ marginRight: '4px', verticalAlign: 'middle' }}
                    >
                      <path
                        fill='#29ffa7'
                        d='M500,0L0,500v1800h600v500l500-500h400l900-900V0H500z M2200,1300l-400,400h-400l-350,350v-350H600V200h1600V1300z'
                      />
                      <rect
                        x='1700'
                        y='550'
                        fill='#29ffa7'
                        width='200'
                        height='600'
                      />
                      <rect
                        x='1150'
                        y='550'
                        fill='#29ffa7'
                        width='200'
                        height='600'
                      />
                    </svg>
                  </picture>
                  Twitch
                </a>
              </div>
            </div>

            <div className='creator-card'>
              <div className='creator-avatar'>
                <img
                  src='./edeneleven.webp'
                  alt='EdenEleven'
                  className='creator-image'
                />
              </div>
              <div className='creator-info'>
                <h4>EdenEleven</h4>
                <p>3D-герой, Саундтрек</p>
                <a
                  href='https://t.me/matthew_eden'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='creator-link'
                >
                  <img
                    src='./telegram.svg'
                    alt='Telegram'
                    width='16'
                    height='16'
                    style={{
                      marginRight: '4px',
                      verticalAlign: 'middle',
                      filter:
                        'brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(1000%) hue-rotate(90deg) brightness(1.2) contrast(1.2)',
                    }}
                  />
                  Telegram
                </a>
              </div>
            </div>

            <div className='creator-card'>
              <div className='creator-avatar'>
                <img
                  src='./antonan69.webp'
                  alt='AntonAn69'
                  className='creator-image'
                />
              </div>
              <div className='creator-info'>
                <h4>AntonAn69</h4>
                <p>Desinger</p>
                <a
                  href='https://twitch.tv/antonan69'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='creator-link'
                >
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 2400 2800'
                    style={{ marginRight: '4px', verticalAlign: 'middle' }}
                  >
                    <path
                      fill='#29ffa7'
                      d='M500,0L0,500v1800h600v500l500-500h400l900-900V0H500z M2200,1300l-400,400h-400l-350,350v-350H600V200h1600V1300z'
                    />
                    <rect
                      x='1700'
                      y='550'
                      fill='#29ffa7'
                      width='200'
                      height='600'
                    />
                    <rect
                      x='1150'
                      y='550'
                      fill='#29ffa7'
                      width='200'
                      height='600'
                    />
                  </svg>
                  Twitch
                </a>
              </div>
            </div>

            <div className='creator-card'>
              <div className='creator-avatar'>
                <img
                  src='./tianoTV.webp'
                  alt='tianoTV'
                  className='creator-image'
                />
              </div>
              <div className='creator-info'>
                <h4>tianoTV</h4>
                <p>Саундтрек</p>
                <a
                  href='https://twitch.tv/tianoTV'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='creator-link'
                >
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 2400 2800'
                    style={{ marginRight: '4px', verticalAlign: 'middle' }}
                  >
                    <path
                      fill='#29ffa7'
                      d='M500,0L0,500v1800h600v500l500-500h400l900-900V0H500z M2200,1300l-400,400h-400l-350,350v-350H600V200h1600V1300z'
                    />
                    <rect
                      x='1700'
                      y='550'
                      fill='#29ffa7'
                      width='200'
                      height='600'
                    />
                    <rect
                      x='1150'
                      y='550'
                      fill='#29ffa7'
                      width='200'
                      height='600'
                    />
                  </svg>
                  Twitch
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно с думом */}
      <DoomModal
        isOpen={isDoomModalOpen}
        onClose={() => setIsDoomModalOpen(false)}
      />
    </footer>
  );
};

export default CreatorsSection;
