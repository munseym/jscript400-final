import React from 'react'
import { withRouter } from 'react-router'
import { Route } from 'react-router-dom'

import List from './List/List'
import EditForm from './Form/Edit.Form'
import NewForm from './Form/New.Form'

import * as assignmentsApi from '../../api/assignments.js'
import * as usersApi from '../../api/users.js'

class Container extends React.Component {
  constructor (props) {
    super(props)
    this.createAssignment = this.createAssignment.bind(this)
    this.destroyAssignment = this.destroyAssignment.bind(this)
    this.editAssignment = this.editAssignment.bind(this)
  }

  async createAssignment (assignment) {
    const { currentUserId, history, refreshUsers } = this.props

    await assignmentsApi.createAssignment(currentUserId, assignment)
    await refreshUsers()
    history.push(`/home`)
  }

  async destroyAssignment (currentUserId, assignment) {
    const { history, refreshUsers } = this.props
    await assignmentsApi.deleteAssignment(currentUserId, assignment)
    await refreshUsers()
    history.push(`/home`)
  }

  async editAssignment (assignment) {
    const { currentUserId, history, refreshUsers } = this.props
    await assignmentsApi.updateAssignment(currentUserId, assignment)
    await refreshUsers()
    history.push(`/home`)
  }

  render () {
    const { users } = this.props
    const user = users.find(user => user._id === this.props.currentUserId)
    return (
      <>
        <Route path='/home' exact component={() => {
          return <List destroyAssignment={this.destroyAssignment} user={user} />
        }} />
        <Route path='/students/:userId/assignments/new' exact component={() => {
          return <NewForm onSubmit={this.createAssignment} />
        }} />
        <Route path='/students/:userId/assignment/:assignmentId/edit' exact component={({ match }) => {
          const user = users.find(user => user._id === match.params.userId)
          const assignment = user.assignments.find(user => user._id === match.params.assignmentId)
          return <EditForm onSubmit={this.editAssignment} assignment={assignment} />
        }} />
      </>
    )
  }
}

export default withRouter(Container)