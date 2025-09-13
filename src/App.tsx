import { useState, useEffect } from 'react'
import './styles/main.scss'
import TournamentAnalyzer from './components/TournamentAnalyzer'
import TournamentStats from './components/TournamentStats'
import AppHeader from './components/AppHeader'
import AppLoading from './components/AppLoading'
import CreatorsSection from './components/CreatorsSection'
import { TournamentParticipantsData } from './types'
import { dataLoader } from './utils/dataLoader'

function App() {
  const [tournamentData, setTournamentData] = useState<{[key: string]: TournamentParticipantsData}>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Функция для загрузки данных
  const loadTournamentData = async (forceRefresh: boolean = false) => {
    try {
      const tournaments = ['one', 'two', 'three', 'four']
      console.log('🔄 Начинаем загрузку данных турниров...')
      
      // Загружаем данные с предотвращением кеширования
      const data = await dataLoader.loadTournamentData(tournaments, forceRefresh)
      
      console.log('✅ Данные турниров загружены:', Object.keys(data))
      setTournamentData(data)
    } catch (error) {
      console.error('❌ Ошибка при загрузке данных турниров:', error)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  // Функция для принудительного обновления данных
  const handleDataRefresh = async () => {
    setIsRefreshing(true)
    await loadTournamentData(true)
  }

  useEffect(() => {
    loadTournamentData(true) // При первой загрузке принудительно обновляем
  }, [])

  if (isLoading) {
    return <AppLoading />
  }

  return (
    <div className="app">
      <AppHeader 
        onDataRefresh={handleDataRefresh}
        isLoading={isRefreshing}
      />
      
      <main className="app-main">
        <div className="content-section">
          <TournamentStats tournamentData={tournamentData} />
        </div>
        
        <div className="section-divider"></div>
        
        <div className="content-section">
          <h2 className="section-title">Рейтинг игроков</h2>
          <TournamentAnalyzer tournamentData={tournamentData} />
        </div>
      </main>
      
      <CreatorsSection />
    </div>
  )
}

export default App
