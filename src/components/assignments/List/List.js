import React from 'react'

import Actions from './List.Actions'

export default ({ destroyAssignment, user }) => {
  const assignments = user.assignments.map(assignment => (
    <div key={assignment._id} className='card bg-light mb-4'>
      <div className='card-body'>
        <div className='d-flex flex-row justify-content-between'>
          <div>
            <h5 className='card-title'>{ assignment.title }</h5>
            <p className='card-text'> { assignment.description }</p>
            <p> <a href={ assignment.link }>Project Link</a></p>
          </div>
          {assignment.score ?
            <div className='text-success'>{assignment.score} / {assignment.scorePossible}</div>
            : <div className='text-secondary'>Grade TBD</div>
          }
        </div>
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