import request from './request'
const { NODE_ENV } = process.env
const BASE_URL = NODE_ENV === 'development'
  ? 'http://localhost:5000'
  : 'tbd' // Once we deploy, we need to change this

  export const deleteAssignment = async (userId, assignment) => {
    const token = localStorage.getItem('assignment-app')
    const response = await fetch(`${BASE_URL}/api/users/${userId}/assignments/${assignment._id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'DELETE'
    })
    const json = await response.json()
  
    return json
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