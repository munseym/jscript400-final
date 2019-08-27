import React from 'react'
import Form from './Form'

export default ({ onSubmit }) => (
  <section className='container'>
    <h1>Create a New Asssignment</h1>
    <hr />
    <Form onSubmit={onSubmit} />
  </section>
)