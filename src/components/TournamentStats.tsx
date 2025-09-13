import React from 'react';
import { TournamentParticipantsData, TournamentResult } from '../types';
import { processTournamentResults, getPointsStatistics, createPlayerRanking } from '../utils/scoring';

interface TournamentStatsProps {
  tournamentData: {
    [key: string]: TournamentParticipantsData;
  };
}

interface TournamentSummary {
  name: string;
  id: string;
  participantsCount: number;
  results: TournamentResult[];
  statistics: {
    total_players: number;
    players_with_points: number;
    max_points: number;
    average_points: number;
    total_points_distributed: number;
  };
  tournamentNumber: number;
}

const TournamentStats: React.FC<TournamentStatsProps> = ({ tournamentData }) => {
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

  // Функция для получения номера турнира
  const getTournamentNumber = (tournamentName: string): number => {
    const tournamentNumbers: { [key: string]: number } = {
      'one': 1,
      'two': 2,
      'three': 3,
      'four': 4
    };
    return tournamentNumbers[tournamentName] || 999; // Если турнир не найден, ставим в конец
  };

  // Создаем сводку по каждому турниру
  const tournamentSummaries: TournamentSummary[] = Object.entries(tournamentData)
    .map(([tournamentName, participants]) => {
      const results = processTournamentResults(participants);
      const statistics = getPointsStatistics(
        results.map((result, index) => ({
          player: {
            name: result.participant_name,
            username: result.challonge_username,
            challonge_username: result.challonge_username,
            challonge_user_id: result.challonge_user_id,
            tournaments_participated: 1,
            best_rank: result.final_rank,
            worst_rank: result.final_rank,
            average_rank: result.final_rank,
            total_tournaments: 1,
            participation_rate: 1,
            total_points: result.points_earned,
            average_points: result.points_earned,
          },
          position: index + 1,
          points: result.points_earned,
        }))
      );

      return {
        name: `${tournamentName.toUpperCase()}`,
        id: tournamentName,
        participantsCount: participants.length,
        results,
        statistics,
        tournamentNumber: getTournamentNumber(tournamentName),
      };
    })
    .sort((a, b) => a.tournamentNumber - b.tournamentNumber); // Сортируем по номеру турнира

  // Общая статистика по всем турнирам
  const allResults = Object.values(tournamentData).flatMap(processTournamentResults);
  
  // Создаем рейтинг для подсчета уникальных игроков
  const playerRankings = createPlayerRanking(allResults, tournamentSummaries.length);
  
  const overallStats = getPointsStatistics(
    allResults.map((result, index) => ({
      player: {
        name: result.participant_name,
        username: result.challonge_username,
        challonge_username: result.challonge_username,
        challonge_user_id: result.challonge_user_id,
        tournaments_participated: 1,
        best_rank: result.final_rank,
        worst_rank: result.final_rank,
        average_rank: result.final_rank,
        total_tournaments: 1,
        participation_rate: 1,
        total_points: result.points_earned,
        average_points: result.points_earned,
      },
      position: index + 1,
      points: result.points_earned,
    }))
  );
  
  // Обновляем количество игроков на основе уникальных игроков
  overallStats.total_players = playerRankings.length;
  overallStats.players_with_points = playerRankings.filter(player => player.points > 0).length;

  if (!tournamentSummaries.length) {
    return (
      <div className="tournament-stats">
        <h2>Статистика турниров</h2>
        <p>Нет данных для отображения статистики</p>
      </div>
    );
  }

  return (
    <div className="tournament-stats">
      <h2>Статистика турниров TEKKEN RIVALS</h2>
      
      {/* Общая статистика */}
      <div className="overall-stats">
        <h3>Общая статистика</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <div className="stat-value">{tournamentSummaries.length}</div>
              <div className="stat-label">Турниров проведено</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🫂</div>
            <div className="stat-content">
              <div className="stat-value">{overallStats.total_players}</div>
              <div className="stat-label">Участников всего</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <div className="stat-value">{overallStats.players_with_points}</div>
              <div className="stat-label">Игроков с очками</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💎</div>
            <div className="stat-content">
              <div className="stat-value">{overallStats.max_points}</div>
              <div className="stat-label">Максимум очков</div>
            </div>
          </div>
        </div>
      </div>

      {/* Статистика по каждому турниру */}
      <div className="tournaments-grid">
        {tournamentSummaries.map((tournament) => (
          <div 
            key={tournament.id} 
            className={`tournament-card clickable tournament-${tournament.id}`}
            onClick={() => window.open(getTournamentUrl(tournament.id), '_blank')}
          >
            <div className="card-inner">
              {/* Лицевая сторона карты */}
              <div className="card-front">
                <div className="tournament-header">
                  <h4><span>TEKKEN RIVALS {" "}</span><span>{tournament.name}</span></h4>
                  <div className="participants-count">
                    <span title="Количество участников">🟢{tournament.participantsCount}</span>
                    <div className="twitch-link">
                      <svg width="16" height="16" viewBox="0 0 2400 2800" style={{marginRight: '4px', verticalAlign: 'middle'}}>
                        <path fill="#29ffa7" d="M500,0L0,500v1800h600v500l500-500h400l900-900V0H500z M2200,1300l-400,400h-400l-350,350v-350H600V200h1600V1300z"/>
                        <rect x="1700" y="550" fill="#29ffa7" width="200" height="600"/>
                        <rect x="1150" y="550" fill="#29ffa7" width="200" height="600"/>
                      </svg>
                      <a 
                        href="https://twitch.tv/AVICII75" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        twitch.tv/AVICII75
                      </a>
                      <div className="underline"></div>
                    </div>
                  </div>
                </div>
                
                {/* Топ-3 турнира */}
                <div className="tournament-top3">
                  <h5>Топ-3 турнира:</h5>
                  <div className="top3-list">
                    {tournament.results
                      .sort((a, b) => a.final_rank - b.final_rank)
                      .slice(0, 3)
                      .map((result, index) => (
                        <div 
                          key={index} 
                          className="top3-item clickable"
                          onClick={() => window.open(`https://challonge.com/users/${result.challonge_username}`, '_blank')}
                        >
                          <span className="rank">
                            {result.final_rank}
                            {result.final_rank === 1 && '🥇'}
                            {result.final_rank === 2 && '🥈'}
                            {result.final_rank === 3 && '🥉'}
                          </span>
                          <span className="player-name">
                            {result.participant_name}
                          </span>
                          <span className="points">{result.points_earned} очков</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Обратная сторона карты с изображением */}
              <div className="card-back">
                <img 
                  src={`/TEKKENRIVALS/R${tournament.tournamentNumber}.png`} 
                  alt={`TEKKEN RIVALS ${tournament.name}`}
                  className="tournament-image"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default TournamentStats;
