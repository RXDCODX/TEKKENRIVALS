import React, { useState } from 'react';
import { Carousel, Container, Row, Col, Badge, Modal } from 'react-bootstrap';
import { TournamentSummary } from './TournamentStats';

interface TournamentsCarouselProps {
  tournaments: TournamentSummary[];
}

const TournamentsCarousel: React.FC<TournamentsCarouselProps> = ({
  tournaments,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTournament, setSelectedTournament] =
    useState<TournamentSummary | null>(null);

  // Функция для получения ссылки на турнир
  const getTournamentUrl = (tournamentId: string): string => {
    const tournamentUrls: { [key: string]: string } = {
      one: 'https://challonge.com/TEKKENRIVALSONE',
      two: 'https://challonge.com/TEKKENRIVALSTWO',
      three: 'https://challonge.com/TEKKENRIVALSTHREE',
      four: 'https://challonge.com/TEKKENRIVALSFOUR',
    };
    return tournamentUrls[tournamentId] || '#';
  };

  // Функция для получения фонового изображения турнира
  const getTournamentBackground = (tournamentNumber: number): string => {
    return `/TEKKENRIVALS/R${tournamentNumber}.png`;
  };

  // Функция для обработки смены слайда
  const handleSlideChange = (selectedIndex: number) => {
    if (selectedIndex !== activeIndex) {
      setPreviousIndex(activeIndex);
      setActiveIndex(selectedIndex);

      // Убираем класс fade-out через 1 секунду (время анимации)
      setTimeout(() => {
        setPreviousIndex(null);
      }, 1000);
    }
  };

  // Функция для открытия модального окна
  const handleImageClick = (
    tournament: TournamentSummary,
    event: React.MouseEvent
  ) => {
    event.stopPropagation(); // Предотвращаем клик по слайду
    setSelectedTournament(tournament);
    setShowModal(true);
  };

  // Функция для закрытия модального окна
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTournament(null);
  };

  if (!tournaments.length) {
    return (
      <div className='tournaments-carousel'>
        <h3>Турниры TEKKEN RIVALS</h3>
        <p>Нет данных для отображения турниров</p>
      </div>
    );
  }

  return (
    <div className='tournaments-carousel'>
      <h3>Турниры TEKKEN RIVALS</h3>
      <Carousel
        activeIndex={activeIndex}
        onSelect={handleSlideChange}
        interval={showModal ? null : 5000}
        indicators={true}
        autoCorrect={'true'}
        pause={'hover'}
        slide={false}
        fade
        controls={false}
        touch
        className='tournament-carousel'
      >
        {tournaments.map((tournament, index) => (
          <Carousel.Item
            key={tournament.id}
            className={previousIndex === index ? 'fade-out' : ''}
          >
            <div
              className='tournament-slide'
              style={
                {
                  '--tournament-bg': `url(${getTournamentBackground(tournament.tournamentNumber)})`,
                } as React.CSSProperties
              }
              onClick={() =>
                window.open(getTournamentUrl(tournament.id), '_blank')
              }
            >
              {/* Верхняя тень */}
              <div className='tournament-shadow-top'></div>
              {/* Нижняя тень */}
              <div className='tournament-shadow-bottom'></div>
              <Container className='h-100 tournament-overlay'>
                <Row className='h-100 align-items-center'>
                  <Col lg={6} className='tournament-content'>
                    <div className='tournament-header'>
                      <h2 className='tournament-title'>
                        <span className='tournament-brand'>TEKKEN RIVALS</span>
                        <span className='tournament-name'>
                          {tournament.name}
                        </span>
                      </h2>
                      <div className='tournament-meta'>
                        <Badge className='participants-badge'>
                          {tournament.participantsCount} участников
                        </Badge>
                        <div className='twitch-link'>
                          <svg
                            width='20'
                            height='20'
                            viewBox='0 0 2400 2800'
                            className='me-2'
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
                          <a
                            href='https://twitch.tv/AVICII75'
                            target='_blank'
                            rel='noopener noreferrer'
                            onClick={e => e.stopPropagation()}
                            className='twitch-link-text'
                          >
                            twitch.tv/AVICII75
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className='tournament-content-bottom'></div>
                  </Col>

                  <Col lg={6} className='tournament-right-side'></Col>
                </Row>

                {/* Изображение турнира в верхнем правом углу */}
                <div className='tournament-image-container'>
                  <img
                    src={getTournamentBackground(tournament.tournamentNumber)}
                    alt={`${tournament.name} - Турнир ${tournament.tournamentNumber}`}
                    className={`tournament-image ${
                      tournament.tournamentNumber <= 2
                        ? 'landscape'
                        : 'portrait'
                    }`}
                    onClick={e => handleImageClick(tournament, e)}
                  />
                </div>

                <Row
                  className='justify-content-center position-absolute bottom-0 start-50 translate-middle-x w-100'
                  style={{ bottom: '20px' }}
                >
                  <Col xs={12} md={8} lg={6} className='tournament-podium'>
                    <div className='podium-container'>
                      <div className='podium-grid'>
                        {tournament.results
                          .sort((a, b) => a.final_rank - b.final_rank)
                          .slice(0, 3)
                          .map((result, index) => {
                            // Определяем позицию для отображения: 2-е место в первой позиции, 1-е место в центре, 3-е место в третьей
                            let displayIndex = index;
                            if (result.final_rank === 1)
                              displayIndex = 1; // 1-е место в центре
                            else if (result.final_rank === 2)
                              displayIndex = 0; // 2-е место слева
                            else if (result.final_rank === 3) displayIndex = 2; // 3-е место справа

                            return (
                              <div
                                key={result.final_rank}
                                className={`podium-cell place-${result.final_rank}`}
                                style={{ order: displayIndex }}
                                onClick={() =>
                                  window.open(
                                    `https://challonge.com/users/${result.challonge_username}`,
                                    '_blank'
                                  )
                                }
                              >
                                <div className='podium-rank'>
                                  {result.final_rank === 1 && '🥇'}
                                  {result.final_rank === 2 && '🥈'}
                                  {result.final_rank === 3 && '🥉'}
                                </div>
                                <div className='podium-player'>
                                  <div className='player-name'>
                                    {result.participant_name}
                                  </div>
                                  <div className='player-points'>
                                    {result.points_earned} очков
                                  </div>
                                </div>
                                {displayIndex < 2 && (
                                  <div className='podium-divider'></div>
                                )}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Модальное окно для отображения постера турнира */}
      <Modal
        show={showModal}
        onBackdropClick={handleCloseModal}
        onHide={handleCloseModal}
        size='lg'
        centered
        className='tournament-poster-modal'
        backdrop={true}
        keyboard={true}
      >
        <Modal.Body
          className='tournament-modal-body'
          onClick={() => {
            handleCloseModal();
            console.log('sosal');
          }}
        >
          {selectedTournament && (
            <div
              className='tournament-poster-container'
              onClick={e => e.stopPropagation()}
            >
              <img
                src={getTournamentBackground(
                  selectedTournament.tournamentNumber
                )}
                alt={`${selectedTournament.name} - Постер турнира`}
                className={`tournament-poster-image ${
                  selectedTournament.tournamentNumber <= 2
                    ? 'landscape'
                    : 'portrait'
                }`}
              />
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TournamentsCarousel;
