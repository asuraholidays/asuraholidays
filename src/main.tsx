import React, { useEffect, useMemo, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import createThemeDefault, { ColorModeContext, createAppTheme, type Mode } from './theme'

const root = document.getElementById('app') as HTMLDivElement
function Root() {
  const getPreferredMode = (): Mode => {
    try {
      const saved = localStorage.getItem('asura_color_mode') as Mode | null
      if (saved === 'light' || saved === 'dark') return saved
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
    } catch { return 'dark' }
  }
  const [mode, setMode] = useState<Mode>(getPreferredMode())
  useEffect(()=>{ try { localStorage.setItem('asura_color_mode', mode) } catch {} }, [mode])
  const value = useMemo(() => ({ mode, toggle: () => setMode(m => (m === 'light' ? 'dark' : 'light')) }), [mode])
  const theme = useMemo(() => createAppTheme(mode), [mode])
  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Root />
    </BrowserRouter>
  </React.StrictMode>
)
