import './App.scss'

import { FC, Fragment, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

// Contexts
import { ThemeProvider } from '../contexts/theme' // Theme Use Context

// Components
import Header from './header/Header'
import Home from './home/Home'

////////////////////////////////////////////////////////////////////////////////////////////////////
const App: FC = () => {
  return (
    <ThemeProvider>
      <Fragment>
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </Fragment>
    </ThemeProvider>
  )
}

export default App
