import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Admin from './views/Admins/Admin'
import LandingPage from './views/Onboarding/LandingPage/LandingPage'
import SignIn from './views/Onboarding/SignIn/SignIn'
import Student from './views/Student/Student'
import Teacher from './views/Teacher/Teacher'

const App = () => {
  return (
    <Router>
      <div className="wrapper">
        <Navbar />
        <Switch>
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/student" component={Student} />
          <Route exact path="/teacher" component={Teacher} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
