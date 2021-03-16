import React, {useState, useEffect} from 'react'
import {
  Link,
  NavLink,
  Switch,
  Route,
  BrowserRouter as Router
} from 'react-router-dom'
import Join from './join/join'
import Chat from './chat/chat'
import Styles from './App.module.css';


const App=()=>{
  
  return (
    <Router>
    <div className={Styles.App}>
      <Switch>
        <Route path="/" exact component={Join} />
        <Route path="/chat" exact component={Chat} />
      </Switch>
    </div>
    </Router>
  )
}

export default App