import { useState, useEffect } from 'react'
import './styles/main.scss'
import TournamentAnalyzer from './components/TournamentAnalyzer'
import TournamentStats from './components/TournamentStats'
import AppHeader from './components/AppHeader'
import AppLoading from './components/AppLoading'
import CreatorsSection from './components/CreatorsSection'
import { TournamentParticipantsData } from './types'

function App() {
  const [tournamentData, setTournamentData] = useState<{[key: string]: TournamentParticipantsData}>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Загружаем данные турниров
    const loadTournamentData = async () => {
      try {
        const tournaments = ['one', 'two', 'three', 'four']
        const data: {[key: string]: TournamentParticipantsData} = {}

        for (const tournament of tournaments) {
          try {
            const response = await fetch(`./data/${tournament}.json`)
            if (response.ok) {
              const jsonData = await response.json()
              data[tournament] = jsonData
            }
          } catch (error) {
            console.warn(`Не удалось загрузить данные турнира ${tournament}:`, error)
          }
        }

        setTournamentData(data)
      } catch (error) {
        console.error('Ошибка при загрузке данных турниров:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTournamentData()
  }, [])

  if (isLoading) {
    return <AppLoading />
  }

  return (
    <div className="app">
      <AppHeader />
      
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
