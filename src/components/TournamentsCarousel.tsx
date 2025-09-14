import React, { useState } from 'react';
import { Carousel, Container, Row, Col, Badge } from 'react-bootstrap';
import { TournamentSummary } from './TournamentStats';

interface TournamentsCarouselProps {
  tournaments: TournamentSummary[];
}

const TournamentsCarousel: React.FC<TournamentsCarouselProps> = ({ tournaments }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Функция для получения ссылки на турнир
  const getTournamentUrl = (tournamentId: string): string => {
    const tournamentUrls: { [key: string]: string } = {
      'one': 'https://challonge.com/TEKKENRIVALSONE',
      'two': 'https://challonge.com/TEKKENRIVALSTWO',
      'three': 'https://challonge.com/TEKKENRIVALSTHREE',
      'four': 'https://challonge.com/TEKKENRIVALSFOUR'
    };
    return tournamentUrls[tournamentId] || '#';
  };

  // Функция для получения фонового изображения турнира
  const getTournamentBackground = (tournamentNumber: number): string => {
    return `/TEKKENRIVALS/R${tournamentNumber}.png`;
  };

  if (!tournaments.length) {
    return (
      <div className="tournaments-carousel">
        <h3>Турниры TEKKEN RIVALS</h3>
        <p>Нет данных для отображения турниров</p>
      </div>
    );
  }

  return (
    <div className="tournaments-carousel">
      <h3>Турниры TEKKEN RIVALS</h3>
      
      <Carousel
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
        interval={null} // Отключаем автоматическое переключение
        indicators={false}
        controls={true}
        className="tournament-carousel"
      >
        {tournaments.map((tournament) => (
          <Carousel.Item key={tournament.id}>
            <div 
              className="tournament-slide"
              style={{
                backgroundImage: `url(${getTournamentBackground(tournament.tournamentNumber)})`
              }}
              onClick={() => window.open(getTournamentUrl(tournament.id), '_blank')}
            >
              <div className="tournament-overlay">
                <Container className="h-100">
                  <Row className="h-100 align-items-center">
                    {/* Левая половина с информацией о турнире */}
                    <Col lg={6} className="tournament-content">
                      <div className="tournament-header">
                        <h2 className="tournament-title">
                          <span className="tournament-brand">TEKKEN RIVALS</span>
                          <span className="tournament-name">{tournament.name}</span>
                        </h2>
                        <div className="tournament-meta">
                          <Badge className="participants-badge">
                            {tournament.participantsCount} участников
                          </Badge>
                          <div className="twitch-link">
                            <svg width="20" height="20" viewBox="0 0 2400 2800" className="me-2">
                              <path fill="#29ffa7" d="M500,0L0,500v1800h600v500l500-500h400l900-900V0H500z M2200,1300l-400,400h-400l-350,350v-350H600V200h1600V1300z"/>
                              <rect x="1700" y="550" fill="#29ffa7" width="200" height="600"/>
                              <rect x="1150" y="550" fill="#29ffa7" width="200" height="600"/>
                            </svg>
                            <a 
                              href="https://twitch.tv/AVICII75" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="twitch-link-text"
                            >
                              twitch.tv/AVICII75
                            </a>
                          </div>
                        </div>
                      </div>
                      
                      <div className="tournament-content-bottom">
                        {/* Дополнительный контент можно добавить сюда */}
                      </div>
                    </Col>

                    {/* Правая половина - пустая для фонового изображения */}
                    <Col lg={6} className="tournament-right-side">
                      {/* Пустая область для фонового изображения */}
                    </Col>
                  </Row>

                  {/* Нижняя часть с пьедесталом */}
                  <Row className="justify-content-center position-absolute bottom-0 start-50 translate-middle-x w-100" style={{bottom: '20px'}}>
                    <Col xs={12} md={8} lg={6} className="tournament-podium">
                      <div className="podium-container">
                        <div className="podium-grid">
                          {tournament.results
                            .sort((a, b) => a.final_rank - b.final_rank)
                            .slice(0, 3)
                            .map((result, index) => (
                              <div 
                                key={index} 
                                className={`podium-cell place-${result.final_rank}`}
                                onClick={() => window.open(`https://challonge.com/users/${result.challonge_username}`, '_blank')}
                              >
                                <div className="podium-rank">
                                  {result.final_rank === 1 && '🥇'}
                                  {result.final_rank === 2 && '🥈'}
                                  {result.final_rank === 3 && '🥉'}
                                </div>
                                <div className="podium-player">
                                  <div className="player-name">{result.participant_name}</div>
                                  <div className="player-points">{result.points_earned} очков</div>
                                </div>
                                {index < 2 && <div className="podium-divider"></div>}
                              </div>
                            ))}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Индикаторы слайдов */}
      <div className="carousel-indicators-custom mt-4">
        {tournaments.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Перейти к турниру ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TournamentsCarousel;
