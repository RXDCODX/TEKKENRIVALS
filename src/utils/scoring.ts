/**
 * Утилиты для системы подсчета очков TEKKEN RIVALS
 */

import {
  TournamentParticipant,
  TournamentParticipantsData,
  PlayerSummary,
  TournamentResult,
  PlayerRanking,
} from "../types";

/**
 * Система очков за места в турнире
 * 1 место - 11 очков
 * 2 место - 10 очков
 * 3 место - 8 очков
 * 4 место - 7 очков
 * 5 место - 6 очков
 * 7 место - 5 очков
 */
export const POINTS_SYSTEM: Record<number, number> = {
  1: 11,
  2: 10,
  3: 8,
  4: 7,
  5: 6,
  7: 5,
};

/**
 * Получить количество очков за место в турнире
 * @param rank - место в турнире
 * @returns количество очков или 0 если место не дает очков
 */
export function getPointsForRank(rank: number): number {
  if (!rank || rank <= 0) {
    return 0;
  }

  return POINTS_SYSTEM[rank] || 0;
}

/**
 * Проверить, дает ли место очки
 * @param rank - место в турнире
 * @returns true если место дает очки
 */
export function isRankEligibleForPoints(rank: number): boolean {
  return rank in POINTS_SYSTEM;
}

/**
 * Получить все места, которые дают очки
 * @returns массив мест с очками
 */
export function getEligibleRanks(): number[] {
  return Object.keys(POINTS_SYSTEM)
    .map(Number)
    .sort((a, b) => a - b);
}

/**
 * Получить максимальное количество очков за турнир
 * @returns максимальные очки (за 1 место)
 */
export function getMaxPointsPerTournament(): number {
  return POINTS_SYSTEM[1];
}

/**
 * Обработать данные участников турнира и добавить информацию об очках
 * @param participantsData - данные участников турнира
 * @returns массив результатов с очками
 */
export function processTournamentResults(
  participantsData: TournamentParticipantsData
): TournamentResult[] {
  return participantsData
    .map(({ participant }) => ({
      tournament_id: participant.tournament_id,
      final_rank: participant.final_rank || 0,
      points_earned: getPointsForRank(participant.final_rank || 0),
      participant_name: participant.name,
      challonge_username: participant.challonge_username,
    }))
    .filter((result) => result.final_rank > 0); // Исключаем участников без финального места
}

/**
 * Создать сводку по игроку на основе всех его результатов
 * @param results - массив результатов игрока
 * @param totalTournaments - общее количество турниров
 * @returns сводная информация об игроке
 */
export function createPlayerSummary(
  results: TournamentResult[],
  totalTournaments: number
): PlayerSummary {
  if (!results.length) {
    return {
      name: "",
      username: "",
      challonge_username: "",
      challonge_user_id: 0,
      tournaments_participated: 0,
      best_rank: null,
      worst_rank: null,
      average_rank: null,
      total_tournaments: totalTournaments,
      participation_rate: 0,
      total_points: 0,
      average_points: 0,
    };
  }

  const ranks = results.map((r) => r.final_rank).filter((rank) => rank > 0);
  const points = results.map((r) => r.points_earned);

  const firstResult = results[0];

  return {
    name: firstResult.participant_name,
    username: firstResult.challonge_username,
    challonge_username: firstResult.challonge_username,
    challonge_user_id: 0, // Будет заполнено при обработке
    tournaments_participated: results.length,
    best_rank: ranks.length > 0 ? Math.min(...ranks) : null,
    worst_rank: ranks.length > 0 ? Math.max(...ranks) : null,
    average_rank:
      ranks.length > 0
        ? Math.round(
            (ranks.reduce((sum, rank) => sum + rank, 0) / ranks.length) * 100
          ) / 100
        : null,
    total_tournaments: totalTournaments,
    participation_rate:
      totalTournaments > 0
        ? Math.round((results.length / totalTournaments) * 100) / 100
        : 0,
    total_points: points.reduce((sum, point) => sum + point, 0),
    average_points:
      Math.round(
        (points.reduce((sum, point) => sum + point, 0) / results.length) * 100
      ) / 100,
  };
}

/**
 * Создать рейтинг игроков по очкам
 * @param allResults - все результаты всех игроков
 * @param totalTournaments - общее количество турниров
 * @returns отсортированный рейтинг игроков
 */
export function createPlayerRanking(
  allResults: TournamentResult[],
  totalTournaments: number
): PlayerRanking[] {
  // Группируем результаты по игрокам
  const playerResultsMap = new Map<string, TournamentResult[]>();

  for (const result of allResults) {
    const key = result.challonge_username;
    if (!playerResultsMap.has(key)) {
      playerResultsMap.set(key, []);
    }
    playerResultsMap.get(key)!.push(result);
  }

  // Создаем сводки по игрокам и сортируем по очкам
  const rankings: PlayerRanking[] = [];
  let position = 1;

  for (const [username, results] of playerResultsMap) {
    const playerSummary = createPlayerSummary(results, totalTournaments);
    rankings.push({
      player: playerSummary,
      position: position++,
      points: playerSummary.total_points,
    });
  }

  // Сортируем по убыванию очков
  rankings.sort((a, b) => b.points - a.points);

  // Обновляем позиции после сортировки
  rankings.forEach((ranking, index) => {
    ranking.position = index + 1;
  });

  return rankings;
}

/**
 * Получить статистику по очкам
 * @param rankings - рейтинг игроков
 * @returns статистика по очкам
 */
export function getPointsStatistics(rankings: PlayerRanking[]) {
  if (!rankings.length) {
    return {
      total_players: 0,
      players_with_points: 0,
      max_points: 0,
      min_points: 0,
      average_points: 0,
      total_points_distributed: 0,
    };
  }

  const points = rankings.map((r) => r.points);
  const playersWithPoints = rankings.filter((r) => r.points > 0);

  return {
    total_players: rankings.length,
    players_with_points: playersWithPoints.length,
    max_points: Math.max(...points),
    min_points: Math.min(...points),
    average_points:
      Math.round(
        (points.reduce((sum, p) => sum + p, 0) / rankings.length) * 100
      ) / 100,
    total_points_distributed: points.reduce((sum, p) => sum + p, 0),
  };
}
