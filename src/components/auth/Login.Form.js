import React from 'react'
import Form from './Form'

export default ({ onSubmit }) => (
  <main className='container'>
    <section className='row justify-content-start'>
      <div className='col col-lg-5'>
        <h1>Login</h1>
        <Form isLogin='true' onSubmit={onSubmit} />
      </div>
    </section>
  </main>
)