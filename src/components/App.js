import React from 'react'

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Header from './shared/Header'
import Navigation from './shared/Navigation/Navigation'
import Login from './auth/Login.Form'
import Signup from './auth/Signup.Form'
import UsersContainer from './users/Container'

import * as auth from '../api/auth'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      currentUserId: null,
      loading: true,
      loginError: false
    }

    this.loginUser = this.loginUser.bind(this)
    this.signupUser = this.signupUser.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
  }

  async componentDidMount() {
    const token = window.localStorage.getItem('assignment-app')
    
    if (token) {
      const profile = await auth.profile()
      if(profile && profile.user){
        this.setState({ currentUserId: profile.user._id })
      }else{
        this.logoutUser()
      }
    }

    this.setState({ loading: false })
  }

  async loginUser (user) {
    await auth.login(user)
    const profile = await auth.profile()
    if(!profile || !profile.user || !profile.user._id){
      this.setState({loginError: true})
    }else{
      this.setState({loginError: false,
        currentUserId: profile.user._id})
    }
  }

  async signupUser (user) {
    await auth.signup(user)
    const profile = await auth.profile()

    if(!profile || !profile.user || !profile.user._id){
      this.setState({loginError: true})
    }else{
      this.setState({loginError: false,
        currentUserId: profile.user._id})
    }
  }

  logoutUser () {
    window.localStorage.removeItem('assignment-app')
    this.setState({ currentUserId: null })
  }

  render () {
    if (this.state.loading) return <p>Loading...</p>
    
    return (
      <Router>
        <Header />
        <Navigation
          currentUserId={this.state.currentUserId}
          logoutUser={this.logoutUser}
          />
        <Switch>
          <Route path='/login' exact component={() => {
            return this.state.currentUserId ? (
              <Redirect to='/home' />
            ) : (
              <Login onSubmit={this.loginUser} />
            )
          }} />
          <Route path='/signup' exact component={() => {
            return this.state.currentUserId ? (
              <Redirect to='/home' />
            ) : (
              <Signup onSubmit={this.signupUser} />
            )
          }} />

          <Route path='/students' render={() => {
            return this.state.currentUserId ? <UsersContainer currentUserId={this.state.currentUserId} /> : <Redirect to='/login' />
          }} />

          <Route path='/home' render={() => {
            return this.state.currentUserId ? <UsersContainer currentUserId={this.state.currentUserId} /> : <Redirect to='/login' />
          }} />

          <Redirect to='/login' />
        }
        </Switch>
        {this.state.loginError &&
          <div className='alert alert-danger'>
            Invalid login credentials. Please check your email and password and try again!
          </div>
        }
      </Router>
    )
  }
}

export default App