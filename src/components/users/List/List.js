import React from 'react'
import { Link } from 'react-router-dom'

export default ({ users }) => {
  const students = users.map(student => (
    <div key={student._id} className='card bg-light mb-4'>
      <div className='d-flex flex-row justify-content-between'>
        <div>
          <span className='font-weight-bold'>{student.firstName} {student.lastName}</span>
          <span> - {student.email}</span>
        </div>
      </div>
    </div>
  ))

  return (
    <>
      {students}
    </>
  )
}