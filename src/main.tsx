import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { MetrikaCounters } from 'react-metrika'

// Добавляем класс loaded к body после инициализации React
document.body.classList.add('loaded')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <MetrikaCounters ids={[104140647]} options={{ trackHash: true,
      webvisor: true
    }} />
  </StrictMode>
)
