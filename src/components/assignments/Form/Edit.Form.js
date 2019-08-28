import React from 'react'
import Form from './Form'

export default ({ onSubmit, assignment }) => (
  <section className='container'>
    <h1>Edit Your Post</h1>
    <hr />
    <Form assignment={assignment} onSubmit={onSubmit} />
  </section>
)