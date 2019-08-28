import request from './request'
const { NODE_ENV } = process.env
const BASE_URL = NODE_ENV === 'development'
  ? 'http://localhost:5000'
  : 'tbd' // Once we deploy, we need to change this

  export const deleteAssignment = async (userId, assignment) => {
    const path = `/api/users/${userId}/assignments/${assignment}`
    const options = { method: 'DELETE' }
    return request(path, options)
  }
  
  export const createAssignment = (userId, assignment) => {
    const path = `/api/users/${userId}/assignments`
    const options = { body: assignment, method: 'POST' }
    return request(path, options)
  }
  
  export const updateAssignment = (userId, assignment) => {
    const path = `/api/users/${userId}/assignments/${assignment._id}`
    const options = { body: assignment, method: 'PUT' }
    return request(path, options)
  }