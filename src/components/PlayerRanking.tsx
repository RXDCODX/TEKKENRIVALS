import React from 'react';
import { PlayerRanking as PlayerRankingType } from '../types';
import { getPointsStatistics } from '../utils/scoring';

interface PlayerRankingProps {
  rankings: PlayerRankingType[];
}

const PlayerRanking: React.FC<PlayerRankingProps> = ({ rankings }) => {
  const statistics = getPointsStatistics(rankings);

  if (!rankings.length) {
    return (
      <div className="ranking-container">
        <h2>Рейтинг игроков</h2>
        <p>Нет данных для отображения рейтинга</p>
      </div>
    );
  }

  return (
    <div className="ranking-container">
      <h2>Рейтинг игроков TEKKEN RIVALS</h2>
      
      {/* Статистика */}
      <div className="statistics">
        <h3>Статистика</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Всего игроков:</span>
            <span className="stat-value">{statistics.total_players}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Игроков с очками:</span>
            <span className="stat-value">{statistics.players_with_points}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Максимум очков:</span>
            <span className="stat-value">{statistics.max_points}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Среднее очков:</span>
            <span className="stat-value">{statistics.average_points}</span>
          </div>
        </div>
      </div>

      {/* Рейтинг */}
      <div className="rankings-table">
        <h3>Таблица рейтинга</h3>
        <table>
          <thead>
            <tr>
              <th>Место</th>
              <th>Игрок</th>
              <th>Challonge</th>
              <th>Очки</th>
              <th>Турниров</th>
              <th>Лучшее место</th>
              <th>Участие %</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((ranking) => (
              <tr key={ranking.player.challonge_username}>
                <td className="position">
                  {ranking.position}
                  {ranking.position <= 3 && (
                    <span className="medal">
                      {ranking.position === 1 ? '🥇' : 
                       ranking.position === 2 ? '🥈' : '🥉'}
                    </span>
                  )}
                </td>
                <td className="player-name">{ranking.player.name}</td>
                <td className="username">{ranking.player.challonge_username}</td>
                <td className="points">{ranking.points}</td>
                <td>{ranking.player.tournaments_participated}</td>
                <td>
                  {ranking.player.best_rank 
                    ? `${ranking.player.best_rank}${getOrdinalSuffix(ranking.player.best_rank)}`
                    : '-'
                  }
                </td>
                <td>{Math.round(ranking.player.participation_rate * 100)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

/**
 * Получить суффикс для порядкового числа
 */
function getOrdinalSuffix(num: number): string {
  const j = num % 10;
  const k = num % 100;
  
  if (j === 1 && k !== 11) {
    return 'st';
  }
  if (j === 2 && k !== 12) {
    return 'nd';
  }
  if (j === 3 && k !== 13) {
    return 'rd';
  }
  return 'th';
}

export default PlayerRanking;
