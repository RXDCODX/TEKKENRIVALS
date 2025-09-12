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

      <style jsx>{`
        .ranking-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        h2 {
          color: #2c3e50;
          text-align: center;
          margin-bottom: 30px;
          font-size: 2.5rem;
        }

        h3 {
          color: #34495e;
          margin-bottom: 20px;
          font-size: 1.5rem;
        }

        .statistics {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 30px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }

        .stat-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .stat-label {
          font-weight: 500;
          color: #555;
        }

        .stat-value {
          font-weight: bold;
          color: #2c3e50;
          font-size: 1.1rem;
        }

        .rankings-table {
          background: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          background: #34495e;
          color: white;
          padding: 15px 10px;
          text-align: left;
          font-weight: 600;
          font-size: 0.9rem;
        }

        td {
          padding: 12px 10px;
          border-bottom: 1px solid #ecf0f1;
          font-size: 0.9rem;
        }

        tr:hover {
          background: #f8f9fa;
        }

        .position {
          font-weight: bold;
          color: #2c3e50;
          text-align: center;
          position: relative;
        }

        .medal {
          margin-left: 8px;
          font-size: 1.2rem;
        }

        .player-name {
          font-weight: 600;
          color: #2c3e50;
        }

        .username {
          color: #7f8c8d;
          font-style: italic;
        }

        .points {
          font-weight: bold;
          color: #27ae60;
          font-size: 1.1rem;
          text-align: center;
        }

        @media (max-width: 768px) {
          .ranking-container {
            padding: 10px;
          }
          
          h2 {
            font-size: 2rem;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          table {
            font-size: 0.8rem;
          }
          
          th, td {
            padding: 8px 5px;
          }
        }
      `}</style>
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
