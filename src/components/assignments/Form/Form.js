import React from 'react'

export default class Form extends React.Component {
  constructor (props) {
    super(props)
    const { assignment = {} } = this.props
    const { _id='', title = '', link = '', description = '' } = assignment
    this.state = { _id, title, link, description }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange ({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-row'>
            <div>
                <div className='form-group mx-4'>
                <label htmlFor='title'>Assignment Title</label>
                <input
                    className='form-control'
                    id='title'
                    onChange={this.handleChange}
                    name='title'
                    type='text'
                    value={this.state.title} />
                </div>
                <div className='form-group mx-4'>
                <label htmlFor='link'>Project Link</label>
                <textarea
                    className='form-control'
                    id='link'
                    onChange={this.handleChange}
                    name='link'
                    type='text'
                    value={this.state.link} />
                </div>
            </div>
            <div className='form-group mx-4'>
                <label htmlFor='link'>Project Description</label>
                <textarea
                    className='form-control'
                    id='description'
                    onChange={this.handleChange}
                    name='description'
                    type='text'
                    value={this.state.description} />
            </div>
        </div>
        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    )
  }
}