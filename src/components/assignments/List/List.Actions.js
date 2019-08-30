import React from 'react'
import { Link } from 'react-router-dom'

export default ({ destroyAssignment, assignment, user }) => {
  return(
  <div className='d-flex justify-content-start'>
    <Link className='btn btn-outline-dark text-black mb-4 mx-4'
      to={`/students/${user._id}/assignment/${assignment._id}/edit`}>Edit</Link>

    <button
      className='btn btn-dark btn-link text-white mb-4 mx-2'
       onClick={() => {
         destroyAssignment(user._id, assignment._id)}
       }
      >
      Delete
    </button>
  </div>
)}