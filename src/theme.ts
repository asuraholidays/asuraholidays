import React from 'react'
import { createTheme } from '@mui/material/styles'

export type Mode = 'light' | 'dark'

export const ColorModeContext = React.createContext<{ mode: Mode; toggle: () => void }>({ mode: 'dark', toggle: () => {} })

export function createAppTheme(mode: Mode) {
  const isDark = mode === 'dark'
  return createTheme({
    palette: {
      mode,
      primary: { main: '#ff6b6b' },
      secondary: { main: '#4dabf7' },
      background: isDark
        ? { default: '#0a0f1f', paper: '#0e1526' }
        : { default: '#f7f7f9', paper: '#ffffff' },
      text: isDark
        ? { primary: '#e5e7eb', secondary: '#9aa4b2' }
        : { primary: '#111827', secondary: '#374151' },
    },
    typography: {
      fontFamily: [
        'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Ubuntu', 'Cantarell', 'Helvetica Neue', 'Arial', 'Noto Sans',
      ].join(','),
      h1: { fontWeight: 800 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 600 },
    },
    shape: { borderRadius: 14 },
    components: {
      MuiButton: {
        styleOverrides: { root: { textTransform: 'none', fontWeight: 700, borderRadius: 999 } },
      },
      MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    },
  })
}

export default createAppTheme('dark')
