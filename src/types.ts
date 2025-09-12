/**
 * Типы для данных участников турниров TEKKEN RIVALS
 */

/**
 * Основной тип участника турнира
 */
export interface TournamentParticipant {
  id: number;
  tournament_id: number;
  name: string;
  seed: number;
  active: boolean;
  created_at: string;
  updated_at: string;
  invite_email: string | null;
  final_rank: number | null;
  misc: string | null;
  icon: string | null;
  on_waiting_list: boolean;
  invitation_id: number | null;
  group_id: number | null;
  checked_in_at: string | null;
  ranked_member_id: number | null;
  custom_field_response: string | null;
  clinch: string | null;
  integration_uids: Record<string, any> | null;
  challonge_username: string;
  challonge_user_id: number;
  challonge_email_address_verified: boolean;
  removable: boolean;
  participatable_or_invitation_attached: boolean;
  confirm_remove: boolean;
  invitation_pending: boolean;
  display_name_with_invitation_email_address: string;
  email_hash: string;
  username: string;
  display_name: string;
  attached_participatable_portrait_url: string;
  can_check_in: boolean;
  checked_in: boolean;
  reactivatable: boolean;
  check_in_open: boolean;
  group_player_ids: number[];
  has_irrelevant_seed: boolean;
  ordinal_seed: string;
  roster_complete: boolean | null;
  roster_size: number | null;
}

/**
 * Обертка для участника турнира (структура из JSON файлов)
 */
export interface ParticipantWrapper {
  participant: TournamentParticipant;
}

/**
 * Массив участников турнира
 */
export type TournamentParticipantsData = ParticipantWrapper[];

/**
 * Информация о турнире
 */
export interface TournamentInfo {
  id: number;
  name?: string;
  date?: string;
  participants_count?: number;
}

/**
 * Сводная информация об участнике по всем турнирам
 */
export interface PlayerSummary {
  name: string;
  username: string;
  challonge_username: string;
  challonge_user_id: number;
  tournaments_participated: number;
  best_rank: number | null;
  worst_rank: number | null;
  average_rank: number | null;
  total_tournaments: number;
  participation_rate: number;
}

/**
 * Статистика по турнирам
 */
export interface TournamentStatistics {
  total_tournaments: number;
  total_participants: number;
  unique_players: number;
  most_active_player: string;
  average_participants_per_tournament: number;
}
