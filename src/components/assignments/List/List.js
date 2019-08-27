import React from 'react'

import Actions from './List.Actions'

export default ({ destroyAssignment, user }) => {
  const assignments = user.assignments.map(assignment => (
    <div key={assignment._id} className='card'>
      <div className='card-body'>
        <p className='card-text'>{ assignment.title }</p>
        <blockquote className='blockquote mb-0'>
          <footer className='blockquote-footer'>Was feeling: { assignment.description }</footer>
        </blockquote>
      </div>
      <Actions destroyAssignment={destroyAssignment} assignment={assignment} user={user} />
    </div>
  ))

  return (
    <>
      { assignments }
    </>
  )
}