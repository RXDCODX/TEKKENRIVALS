import React from 'react';
import { dataLoader } from '../utils/dataLoader';

interface DataRefreshButtonProps {
  onRefresh: () => void;
  isLoading?: boolean;
}

const DataRefreshButton: React.FC<DataRefreshButtonProps> = ({
  onRefresh,
  isLoading = false,
}) => {
  const handleRefresh = async () => {
    try {
      console.log('🔄 Принудительное обновление данных...');

      // Очищаем кеш
      dataLoader.clearCache();

      // Вызываем callback для перезагрузки данных
      onRefresh();

      console.log('✅ Данные обновлены');
    } catch (error) {
      console.error('❌ Ошибка при обновлении данных:', error);
    }
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isLoading}
      className='refresh-button'
      title='Обновить данные турниров'
    >
      <svg
        width='16'
        height='16'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        className={isLoading ? 'rotating' : ''}
      >
        <path d='M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8' />
        <path d='M21 3v5h-5' />
        <path d='M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16' />
        <path d='M8 16H3v5' />
      </svg>
      {isLoading ? 'Обновление...' : 'Обновить данные'}
    </button>
  );
};

export default DataRefreshButton;
