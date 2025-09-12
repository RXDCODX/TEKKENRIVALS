import React from 'react';
import { TournamentParticipantsData, TournamentResult } from '../types';
import { processTournamentResults, getPointsStatistics } from '../utils/scoring';

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
}

const TournamentStats: React.FC<TournamentStatsProps> = ({ tournamentData }) => {
  // Создаем сводку по каждому турниру
  const tournamentSummaries: TournamentSummary[] = Object.entries(tournamentData).map(([tournamentName, participants]) => {
    const results = processTournamentResults(participants);
    const statistics = getPointsStatistics(
      results.map((result, index) => ({
        player: {
          name: result.participant_name,
          username: result.challonge_username,
          challonge_username: result.challonge_username,
          challonge_user_id: 0,
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
      name: `Турнир ${tournamentName.toUpperCase()}`,
      id: tournamentName,
      participantsCount: participants.length,
      results,
      statistics,
    };
  });

  // Общая статистика по всем турнирам
  const allResults = Object.values(tournamentData).flatMap(processTournamentResults);
  const overallStats = getPointsStatistics(
    allResults.map((result, index) => ({
      player: {
        name: result.participant_name,
        username: result.challonge_username,
        challonge_username: result.challonge_username,
        challonge_user_id: 0,
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
            <div className="stat-icon">👥</div>
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
          <div key={tournament.id} className="tournament-card">
            <div className="tournament-header">
              <h4>{tournament.name}</h4>
              <span className="participants-count">{tournament.participantsCount} участников</span>
            </div>
            
            <div className="tournament-stats-grid">
              <div className="tournament-stat">
                <span className="stat-label">Участников:</span>
                <span className="stat-value">{tournament.statistics.total_players}</span>
              </div>
              <div className="tournament-stat">
                <span className="stat-label">С очками:</span>
                <span className="stat-value">{tournament.statistics.players_with_points}</span>
              </div>
              <div className="tournament-stat">
                <span className="stat-label">Макс. очки:</span>
                <span className="stat-value">{tournament.statistics.max_points}</span>
              </div>
              <div className="tournament-stat">
                <span className="stat-label">Средние очки:</span>
                <span className="stat-value">{tournament.statistics.average_points}</span>
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
                      className="top3-item"
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
        ))}
      </div>

    </div>
  );
};

export default TournamentStats;
