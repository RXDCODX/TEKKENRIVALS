import React from 'react';

const AppLoading: React.FC = () => {
  return (
    <div className='app-loading'>
      <h1>TEKKEN RIVALS</h1>
      <div className='loading-spinner'></div>
      <p>Загрузка данных турниров...</p>
    </div>
  );
};

export default AppLoading;
