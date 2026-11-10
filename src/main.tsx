import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< HEAD
import { BrowserRouter } from 'react-router-dom'
import { EventsProvider } from './context/EventsContext'
=======
>>>>>>> 5cc2ab86f04fc691be84451c896bca6e1b1d57d8
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
<<<<<<< HEAD
    <BrowserRouter>
      <EventsProvider>
        <App />
      </EventsProvider>
    </BrowserRouter>
  </StrictMode>,
)
=======
    <App />
  </StrictMode>,
)
>>>>>>> 5cc2ab86f04fc691be84451c896bca6e1b1d57d8
