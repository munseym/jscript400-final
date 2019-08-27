import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

export default ({ destroyAssignment, assignment, user }) => (
  <div className='d-flex justify-content-start'>
    <button className='btn btn-outline-dark text-black mb-4 mx-4' to={`/users/${user._id}/posts/${assignment._id}/edit`}>Edit</button>

    <button
      className='btn btn-dark btn-link text-white mb-4 mx-2'
      onClick={() => destroyAssignment(user._id, assignment._id)}>
      Delete
    </button>
    {/* <span className='btn btn-link text-muted' disabled>Created {moment(post.created_at).fromNow()}</span> */}
  </div>
)