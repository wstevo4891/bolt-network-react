// Layout Component

import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Routes from '../Routes'

import MainContainer from './components/MainContainer'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import './styles/index.scss'

function Layout() {
  return(
    <Router>
      <MainContainer>
        {slideLength => (
          <>
            <Route render={(routeProps) =>
              <Navbar {...routeProps} />
            } />

            <Routes slideLength={slideLength} />
          </>
        )}
      </MainContainer>

      <Footer />
    </Router>
  )
}

export default Layout
