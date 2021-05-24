import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import LandingPage from './views/Onboarding/LandingPage/LandingPage'
import SignIn from './views/Onboarding/SignIn/SignIn'
import './App.css'

const App = () => {
  return (
    <Router>
      <div className="wrapper">
        <Navbar />
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
