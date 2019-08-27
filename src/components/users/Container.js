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
      ]
    }
  }

  async componentDidMount () {
    const token = window.localStorage.getItem('assignment-app')
    if (token) {
      const users = await api.getAllUsers()
      this.setState({ users })
    }
  }

  async refreshUsers() {
    const userList = await api.getAllUsers()
    this.setState({ users: userList })
  }
  
  // removePost
  // -- would remove a single post from the state;
  // calling set state
    // removePost(postId){
    //   const posts = this.state.users.posts.filter(function(post, index, arr){
    //     return post.id != postId;
    //   })
    //   this.setState({"users.posts": posts})
    // }

  // async removePost(postId) {
  //     const posts = this.state.users.posts.filter(function(post, index, arr){
  //       return post.id !== postId;
  //     })
  //     this.setState({"users.posts": posts})
  // }

  render () {
    const { currentUserId } = this.props
    const { users } = this.state
    return (
      <main className='container'>
        <Route path='/users' exact component={() => <List users={users} />} />
        <AssignmentsContainer currentUserId={currentUserId} users={users} refreshUsers={this.refreshUsers} />
      </main>
    )
  }
}