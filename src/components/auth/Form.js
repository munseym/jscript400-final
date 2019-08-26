import React from 'react'
import { withRouter } from 'react-router'

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      emailAddress: '',
      password: '',
      firstName: '',
      lastName: '',
      errors: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
      error: false,
      errors: []
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    let myErrors = []
    const emailRegex = /\w+@\w+\.\w+/
    if (!this.state.emailAddress || this.state.emailAddress === '') {
      myErrors.push('Email is required!')
    } else if (!emailRegex.test(this.state.emailAddress)) {
      myErrors.push('Please enter a valid email address!')
    }
    if(!this.state.password || this.state.password === ''){
      myErrors.push('Password is required')
    }else if(this.state.password.length < 8){
      myErrors.push('Password must be at least 8 characters!')
    }
    if(!this.props.isLogin && (!this.state.firstName || this.state.firstName === '')){
      myErrors.push('First Name is Required!')
    }
    if(!this.props.isLogin && (!this.state.lastName || this.state.lastName === '')){
      myErrors.push('Last Name is Required!')
    }
    if (myErrors.length === 0) {
      this.props.onSubmit(this.state)
      this.props.history.push('/users')
    } else {
      this.setState({errors: myErrors})
    }
  }

  render() {
    return (
      <form id='signup-form' onSubmit={this.handleSubmit}>
        <div className='form-row'>
          <div className='form-group col-md-6'>
            <label htmlFor='emailAddress'>Email Address</label>
            <input
              className='form-control validate_input'
              id='emailAddress'
              onChange={this.handleChange}
              name='emailAddress'
              type='text'
              value={this.state.emailAddress} />
          </div>
          <div className='form-group col-md-6'>
            <label htmlFor='password'>Password</label>
            <input
              className='form-control'
              id='password'
              onChange={this.handleChange}
              name='password'
              type='password'
              value={this.state.password} />
          </div>
        </div>
        {!this.props.isLogin &&
          <div className='form-row'>
            <div className='form-group col-md-6'>
              <label htmlFor='firstName'>First Name</label>
              <input
                className='form-control'
                id='firstName'
                onChange={this.handleChange}
                name='firstName'
                type='text'
                value={this.state.firstName} />
            </div>
            <div className='form-group col-md-6'>
              <label htmlFor='lastName'>Last Name</label>
              <input
                className='form-control'
                id='lastName'
                onChange={this.handleChange}
                name='lastName'
                type='text'
                value={this.state.lastName} />
            </div>
          </div>
        }
        <button type='submit' className='btn btn-primary'>Submit</button>
        {this.state.errors.length > 0 &&
          <div className='alert alert-danger'>
            {this.state.errors.map(txt => <p>{txt}</p>)}
          </div>
        }
      </form>
    )
  }
}

export default withRouter(Form)