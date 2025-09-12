/**
 * Утилиты для системы подсчета очков TEKKEN RIVALS
 */

import {
  TournamentParticipantsData,
  PlayerSummary,
  TournamentResult,
  PlayerRanking,
} from "../types";

/**
 * Система очков за места в турнире - TEKKEN RIVALS FINALS
 * 1 место — 11 баллов
 * 2 место — 10 баллов
 * 3 место — 8 баллов
 * 4 место — 7 баллов
 * 5-6 место — 6 баллов
 * 7-8 место — 5 баллов
 * 9-12 место — 4 балла
 * 13-16 место — 3 балла
 * 17-32 место — 2 балла
 * 33 место и ниже — 1 балл
 */
export const POINTS_SYSTEM: Record<number, number> = {
  1: 11,
  2: 10,
  3: 8,
  4: 7,
  5: 6,
  6: 6,
  7: 5,
  8: 5,
  9: 4,
  10: 4,
  11: 4,
  12: 4,
  13: 3,
  14: 3,
  15: 3,
  16: 3,
  17: 2,
  18: 2,
  19: 2,
  20: 2,
  21: 2,
  22: 2,
  23: 2,
  24: 2,
  25: 2,
  26: 2,
  27: 2,
  28: 2,
  29: 2,
  30: 2,
  31: 2,
  32: 2,
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

  // Если место есть в системе очков, возвращаем его
  if (POINTS_SYSTEM[rank]) {
    return POINTS_SYSTEM[rank];
  }

  // Для мест 33 и ниже возвращаем 1 балл
  if (rank >= 33) {
    return 1;
  }

  return 0;
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

  // Специальная обработка для Shadoeshka
  const isShadoeshka = results.some(
    (r) =>
      r.participant_name.toLowerCase().includes("shadoeshka") ||
      (r.challonge_username &&
        r.challonge_username.toLowerCase().includes("shadoe"))
  );

  let bestName: string;
  let bestUsername: string;

  if (isShadoeshka) {
    // Для Shadoeshka используем фиксированные значения
    bestName = "Shadoeshka";
    bestUsername = "_shadoe_";
  } else {
    // Выбираем лучшее имя и username из всех результатов
    bestName = results.reduce((best, current) => {
      // Предпочитаем имя с большей длиной (более полное)
      return current.participant_name.length > best.participant_name.length
        ? current
        : best;
    }).participant_name;

    bestUsername =
      results.reduce((best, current) => {
        // Предпочитаем непустой username
        if (!best.challonge_username && current.challonge_username) {
          return current;
        }
        if (best.challonge_username && !current.challonge_username) {
          return best;
        }
        // Если оба есть, выбираем более длинный
        if (best.challonge_username && current.challonge_username) {
          return current.challonge_username.length >
            best.challonge_username.length
            ? current
            : best;
        }
        return best;
      }).challonge_username || "";
  }

  return {
    name: bestName,
    username: bestUsername,
    challonge_username: bestUsername,
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
/**
 * Нормализовать имя игрока для группировки
 * @param name - имя игрока
 * @param username - username игрока
 * @returns нормализованный ключ для группировки
 */
function normalizePlayerKey(name: string, username: string | null): string {
  // Приводим к нижнему регистру и убираем лишние символы
  const normalizedName = name.toLowerCase().trim();
  const normalizedUsername = username ? username.toLowerCase().trim() : "";

  // Специальное правило для Shadoeshka
  if (
    normalizedName.includes("shadoeshka") ||
    normalizedUsername.includes("shadoe")
  ) {
    return "shadoeshka";
  }

  // Если username пустой, используем только имя
  if (!normalizedUsername) {
    return normalizedName;
  }

  // Если имя и username похожи (содержат одинаковые части), используем username
  if (
    normalizedName.includes(normalizedUsername) ||
    normalizedUsername.includes(normalizedName)
  ) {
    return normalizedUsername;
  }

  // Иначе используем комбинацию
  return `${normalizedName}_${normalizedUsername}`;
}

export function createPlayerRanking(
  allResults: TournamentResult[],
  totalTournaments: number
): PlayerRanking[] {
  // Группируем результаты по игрокам с нормализацией
  const playerResultsMap = new Map<string, TournamentResult[]>();

  for (const result of allResults) {
    const key = normalizePlayerKey(
      result.participant_name,
      result.challonge_username
    );
    if (!playerResultsMap.has(key)) {
      playerResultsMap.set(key, []);
    }
    playerResultsMap.get(key)!.push(result);
  }

  // Создаем сводки по игрокам и сортируем по очкам
  const rankings: PlayerRanking[] = [];
  let position = 1;

  for (const [, results] of playerResultsMap) {
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
