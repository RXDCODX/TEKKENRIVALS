import React from 'react';
import { TournamentParticipantsData, TournamentResult } from '../types';
import {
  processTournamentResults,
  getPointsStatistics,
  createPlayerRanking,
} from '../utils/scoring';
import TournamentsCarousel from './TournamentsCarousel';

interface TournamentStatsProps {
  tournamentData: {
    [key: string]: TournamentParticipantsData;
  };
}

export interface TournamentSummary {
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

const TournamentStats: React.FC<TournamentStatsProps> = ({
  tournamentData,
}) => {
  // Функция для получения номера турнира
  const getTournamentNumber = (tournamentName: string): number => {
    const tournamentNumbers: { [key: string]: number } = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
    };
    return tournamentNumbers[tournamentName] || 999; // Если турнир не найден, ставим в конец
  };

  // Создаем сводку по каждому турниру
  const tournamentSummaries: TournamentSummary[] = Object.entries(
    tournamentData
  )
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
  const allResults = Object.values(tournamentData).flatMap(
    processTournamentResults
  );

  // Создаем рейтинг для подсчета уникальных игроков
  const playerRankings = createPlayerRanking(
    allResults,
    tournamentSummaries.length
  );

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
  overallStats.players_with_points = playerRankings.filter(
    player => player.points > 0
  ).length;

  if (!tournamentSummaries.length) {
    return (
      <div className='tournament-stats'>
        <h2>Статистика турниров</h2>
        <p>Нет данных для отображения статистики</p>
      </div>
    );
  }

  return (
    <div className='tournament-stats'>
      <h2>Статистика турниров TEKKEN RIVALS</h2>

      {/* Общая статистика */}
      <div className='overall-stats'>
        <h3>Общая статистика</h3>
        <div className='stats-grid'>
          <div className='stat-card'>
            <div className='stat-icon'>🏆</div>
            <div className='stat-content'>
              <div className='stat-value'>{tournamentSummaries.length}</div>
              <div className='stat-label'>Турниров проведено</div>
            </div>
          </div>
          <div className='stat-card'>
            <div className='stat-icon'>🫂</div>
            <div className='stat-content'>
              <div className='stat-value'>{overallStats.total_players}</div>
              <div className='stat-label'>Участников всего</div>
            </div>
          </div>
          <div className='stat-card'>
            <div className='stat-icon'>⭐</div>
            <div className='stat-content'>
              <div className='stat-value'>
                {overallStats.players_with_points}
              </div>
              <div className='stat-label'>Игроков с очками</div>
            </div>
          </div>
          <div className='stat-card'>
            <div className='stat-icon'>💎</div>
            <div className='stat-content'>
              <div className='stat-value'>{overallStats.max_points}</div>
              <div className='stat-label'>Максимум очков</div>
            </div>
          </div>
        </div>
      </div>

      {/* Карусель турниров */}
      <TournamentsCarousel tournaments={tournamentSummaries} />
    </div>
  );
};

export default TournamentStats;
