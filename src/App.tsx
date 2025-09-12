import { useState, useEffect } from 'react'
import './App.css'
import TournamentAnalyzer from './components/TournamentAnalyzer'
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
            const response = await fetch(`/data/${tournament}.json`)
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
    return (
      <div className="app-loading">
        <h1>TEKKEN RIVALS</h1>
        <div className="loading-spinner"></div>
        <p>Загрузка данных турниров...</p>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>TEKKEN RIVALS</h1>
        <p>Система подсчета очков за турниры</p>
        <div className="points-info">
          <h3>Система очков:</h3>
          <div className="points-grid">
            <span>1 место → 11 очков</span>
            <span>2 место → 10 очков</span>
            <span>3 место → 8 очков</span>
            <span>4 место → 7 очков</span>
            <span>5 место → 6 очков</span>
            <span>7 место → 5 очков</span>
          </div>
        </div>
      </header>
      
      <main className="app-main">
        <TournamentAnalyzer tournamentData={tournamentData} />
      </main>
    </div>
  )
}

export default App
