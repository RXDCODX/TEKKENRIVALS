import React, { useState, useEffect } from 'react';
import { TournamentParticipantsData } from '../types';
import { 
  processTournamentResults, 
  createPlayerRanking
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

      Object.entries(tournamentData).forEach(([, participants]) => {
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
      
    </div>
  );
};

export default TournamentAnalyzer;
