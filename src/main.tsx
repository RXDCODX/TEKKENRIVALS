import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { MetrikaCounters } from 'react-metrika'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />,
    <MetrikaCounters ids={[104140647]} options={{ trackHash: true,
      webvisor: true
    }} />
  </StrictMode>,
)
