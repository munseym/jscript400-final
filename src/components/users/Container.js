import React from 'react'
import { Route } from 'react-router-dom'

import * as api from '../../api/users'

import List from './List/List'
import AssignmentsContainer from '../assignments/Container'

export default class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      users: [
        { assignments: [] }
      ],
      loading: true
    }
    this.refreshUsers = this.refreshUsers.bind(this)
  }

  async componentDidMount () {
    const token = window.localStorage.getItem('assignment-app')
    if (token) {
      const users = await api.getAllUsers()
      this.setState({ 
        users,
        loading:false
      })
    }else{
      console.log('Couldnt find token')
    }
  }

  async refreshUsers() {
    const userList = await api.getAllUsers()
    this.setState({ users: userList })
  }

  render () {
    if (this.state.loading) return <p>Loading...</p>

    const { currentUserId } = this.props
    const { users } = this.state

    return (
      <main className='container'>
        <Route path='/students' exact component={() => <List users={users} />} />
        <AssignmentsContainer currentUserId={currentUserId} users={users} refreshUsers={this.refreshUsers} />
      </main>
    )
  }
}