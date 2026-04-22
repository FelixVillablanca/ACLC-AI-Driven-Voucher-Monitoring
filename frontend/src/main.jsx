import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import './styling/styles.css';
// import App from './App.jsx'
import RootRouterApp from './RootRouterApp';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootRouterApp />
  </StrictMode>,
)
