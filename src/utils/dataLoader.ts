// Утилита для загрузки данных с предотвращением кеширования

export interface DataVersion {
  version: string;
  timestamp: number;
}

export class DataLoader {
  private static instance: DataLoader;
  private cache: Map<string, any> = new Map();
  private versions: Map<string, DataVersion> = new Map();

  public static getInstance(): DataLoader {
    if (!DataLoader.instance) {
      DataLoader.instance = new DataLoader();
    }
    return DataLoader.instance;
  }

  /**
   * Загружает JSON файл с предотвращением кеширования
   * @param path Путь к файлу
   * @param forceRefresh Принудительно обновить данные
   * @returns Promise с данными
   */
  public async loadJson<T = any>(
    path: string,
    forceRefresh: boolean = false
  ): Promise<T> {
    const cacheKey = path;

    // Если данные в кеше и не требуется принудительное обновление
    if (!forceRefresh && this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // Создаем уникальный URL с timestamp
      const timestamp = Date.now();
      const url = `${path}?v=${timestamp}&t=${Math.random()}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Сохраняем в кеш
      this.cache.set(cacheKey, data);
      this.versions.set(cacheKey, {
        version: timestamp.toString(),
        timestamp: Date.now(),
      });

      console.log(`✅ Данные загружены: ${path} (версия: ${timestamp})`);
      return data;
    } catch (error) {
      console.error(`❌ Ошибка загрузки данных ${path}:`, error);
      throw error;
    }
  }

  /**
   * Загружает данные турниров
   * @param tournaments Список названий турниров
   * @param forceRefresh Принудительно обновить данные
   * @returns Promise с данными всех турниров
   */
  public async loadTournamentData(
    tournaments: string[],
    forceRefresh: boolean = false
  ): Promise<{ [key: string]: any }> {
    const data: { [key: string]: any } = {};

    // Загружаем данные параллельно для ускорения
    const promises = tournaments.map(async (tournament) => {
      try {
        const tournamentData = await this.loadJson(
          `./data/${tournament}.json`,
          forceRefresh
        );
        data[tournament] = tournamentData;
      } catch (error) {
        console.warn(
          `Не удалось загрузить данные турнира ${tournament}:`,
          error
        );
      }
    });

    await Promise.allSettled(promises);
    return data;
  }

  /**
   * Очищает кеш
   */
  public clearCache(): void {
    this.cache.clear();
    this.versions.clear();
    console.log("🗑️ Кеш данных очищен");
  }

  /**
   * Получает информацию о версии данных
   * @param path Путь к файлу
   * @returns Информация о версии или null
   */
  public getVersionInfo(path: string): DataVersion | null {
    return this.versions.get(path) || null;
  }

  /**
   * Проверяет, есть ли данные в кеше
   * @param path Путь к файлу
   * @returns true если данные в кеше
   */
  public hasInCache(path: string): boolean {
    return this.cache.has(path);
  }
}

// Экспортируем singleton instance
export const dataLoader = DataLoader.getInstance();
