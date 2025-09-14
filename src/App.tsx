import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/main.scss'
import TournamentAnalyzer from './components/TournamentAnalyzer'
import TournamentStats from './components/TournamentStats'
import AppHeader from './components/AppHeader'
import AppLoading from './components/AppLoading'
import CreatorsSection from './components/CreatorsSection'
import SplashScreen from './components/SplashScreen'
import { AudioProvider } from './contexts/AudioContext'
import { useAudio } from './hooks/useAudio'
import { TournamentParticipantsData } from './types'
import { dataLoader } from './utils/dataLoader'
import AudioToggleButton from './components/AudioToggleButton'

// Внутренний компонент для работы с аудио
const AppContent: React.FC = () => {
  const { setBackgroundMusic, setSplashActive } = useAudio();
  const [tournamentData, setTournamentData] = useState<{[key: string]: TournamentParticipantsData}>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const [showContent, setShowContent] = useState(false)

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

  // Функция для завершения анимации заставки
  const handleSplashComplete = () => {
    setShowSplash(false)
    setSplashActive(false) // Уведомляем AudioContext о завершении splash screen
    // Запускаем анимации body и app-header после завершения перехода
    setTimeout(() => {
      // Добавляем класс для активации анимаций
      document.body.classList.add('animations-enabled')
    }, 100)
  }

  // Показываем контент через 3.5 секунды (во время анимации)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    loadTournamentData(true) // При первой загрузке принудительно обновляем
  }, [])

  if (isLoading)  {
    return <AppLoading />
  }

  return (
    <>
      {/* Заставка - показывается поверх всего */}
      {showSplash && <SplashScreen onAnimationComplete={handleSplashComplete} />}
      
      {/* Кнопка управления звуком */}
      <AudioToggleButton />
      
      <div className="app">
        {/* Фоновое видео */}
        <video 
          className={`background-video ${showSplash ? 'paused' : 'playing'}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="./background.mp4" type="video/mp4" />
          Ваш браузер не поддерживает видео элемент.
        </video>
        
        {/* Фоновая музыка */}
        <audio 
          ref={(audio) => {
            if (audio) {
              setBackgroundMusic(audio);
            }
          }}
          src="./sr.wav"
          loop
          preload="auto"
        />
        
        <div className={`app-content ${showSplash ? 'hidden' : 'visible'}`}>
          <AppHeader 
            onDataRefresh={handleDataRefresh}
            isLoading={isRefreshing}
            isSplashActive={showSplash}
          />
          
          <main className={`app-main ${showContent ? 'revealed' : 'hidden'}`}>
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
      </div>
    </>
  )
}

function App() {
  return (
    <AudioProvider>
      <AppContent />
    </AudioProvider>
  )
}

export default App
