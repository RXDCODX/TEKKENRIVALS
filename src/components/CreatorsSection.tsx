import React from 'react';

const CreatorsSection: React.FC = () => {
  return (
    <footer className="creators-section">
      <div className="creators-container">
        {/* Главный создатель */}
        <div className="main-creator-section">
          <h3>Главный создатель</h3>
          <div className="creators-grid">
            <div className="creator-card">
              <div className="creator-avatar">
                <img 
                  src="./avicii75.webp" 
                  alt="AVICII75" 
                  className="creator-image"
                />
              </div>
              <div className="creator-info">
                <h4>AVICII75</h4>
                <p>Главный создатель</p>
                <a 
                  href="https://twitch.tv/AVICII75" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="creator-link"
                >
                  <svg width="16" height="16" viewBox="0 0 2400 2800" style={{marginRight: '4px', verticalAlign: 'middle'}}>
                    <path fill="#29ffa7" d="M500,0L0,500v1800h600v500l500-500h400l900-900V0H500z M2200,1300l-400,400h-400l-350,350v-350H600V200h1600V1300z"/>
                    <rect x="1700" y="550" fill="#29ffa7" width="200" height="600"/>
                    <rect x="1150" y="550" fill="#29ffa7" width="200" height="600"/>
                  </svg>
                  Twitch
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Причастные */}
        <div className="contributors-section">
          <h3>Причастные</h3>
          <div className="creators-grid">
            <div className="creator-card">
              <div className="creator-avatar">
                <img 
                  src="./rxdcodx.jpg" 
                  alt="RXDCODX" 
                  className="creator-image"
                />
              </div>
              <div className="creator-info">
                <h4>RXDCODX</h4>
                <p>Верстальщик + Разработчик</p>
                <a 
                  href="https://twitch.tv/rxdcodx" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="creator-link"
                >
                  <svg width="16" height="16" viewBox="0 0 2400 2800" style={{marginRight: '4px', verticalAlign: 'middle'}}>
                    <path fill="#29ffa7" d="M500,0L0,500v1800h600v500l500-500h400l900-900V0H500z M2200,1300l-400,400h-400l-350,350v-350H600V200h1600V1300z"/>
                    <rect x="1700" y="550" fill="#29ffa7" width="200" height="600"/>
                    <rect x="1150" y="550" fill="#29ffa7" width="200" height="600"/>
                  </svg>
                  Twitch
                </a>
              </div>
            </div>
            
            <div className="creator-card">
              <div className="creator-avatar">
                <img 
                  src="./woodwe.png" 
                  alt="WooDWE" 
                  className="creator-image"
                />
              </div>
              <div className="creator-info">
                <h4>WooDWE</h4>
                <p>Дизайнер</p>
                <a 
                  href="#" 
                  className="creator-link disabled"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px', verticalAlign: 'middle'}}>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CreatorsSection;
