import React, { useState, useEffect } from 'react';
import { TournamentParticipantsData } from '../types';
import { 
  processTournamentResults, 
  createPlayerRanking,
  getPointsStatistics 
} from '../utils/scoring';
import PlayerRanking from './PlayerRanking';

interface TournamentAnalyzerProps {
  tournamentData: {
    [key: string]: TournamentParticipantsData;
  };
}

const TournamentAnalyzer: React.FC<TournamentAnalyzerProps> = ({ tournamentData }) => {
  const [rankings, setRankings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!Object.keys(tournamentData).length) {
      setIsLoading(false);
      return;
    }

    try {
      // Обрабатываем данные всех турниров
      const allResults: any[] = [];
      const tournamentIds = new Set<number>();

      Object.entries(tournamentData).forEach(([tournamentName, participants]) => {
        const results = processTournamentResults(participants);
        allResults.push(...results);
        
        // Собираем уникальные ID турниров
        results.forEach(result => tournamentIds.add(result.tournament_id));
      });

      // Создаем рейтинг игроков
      const playerRankings = createPlayerRanking(allResults, tournamentIds.size);
      setRankings(playerRankings);
      
    } catch (error) {
      console.error('Ошибка при обработке данных турниров:', error);
    } finally {
      setIsLoading(false);
    }
  }, [tournamentData]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Обработка данных турниров...</p>
      </div>
    );
  }

  if (!rankings.length) {
    return (
      <div className="no-data-container">
        <h2>Нет данных для анализа</h2>
        <p>Загрузите данные турниров для создания рейтинга</p>
      </div>
    );
  }

  return (
    <div className="tournament-analyzer">
      <PlayerRanking rankings={rankings} />
      
      <style jsx>{`
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 200px;
          color: #666;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .no-data-container {
          text-align: center;
          padding: 40px;
          color: #666;
        }

        .no-data-container h2 {
          color: #2c3e50;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default TournamentAnalyzer;
