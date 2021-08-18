import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../core/Layout'
import { signup } from '../auth'
const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    succes: false,
  })

  const { name, email, password, succes, error } = values

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }

  const clickSubmit = (event) => {
    setValues({ ...values, error: false })
    event.preventDefault()
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, succes: false })
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          succes: true,
        })
      }
    })
  }

  const signUpForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Jméno</label>
        <input
          onChange={handleChange('name')}
          type='text'
          className='form-control'
          value={name}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          onChange={handleChange('email')}
          type='email'
          className='form-control'
          value={email}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Heslo</label>
        <input
          onChange={handleChange('password')}
          type='password'
          className='form-control'
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className='btn btn-primary'>
        Zaregstrovat se
      </button>
    </form>
  )

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  )

  const showSucces = () => (
    <div className='alert alert-info' style={{ display: succes ? '' : 'none' }}>
      New account is created, Please <Link to='Signin'>SignIn</Link>
    </div>
  )

  return (
    <Layout
      title='Sign up'
      description='Sign up here'
      className='container col-md-8 offset-md-2'
    >
      {showSucces()}
      {showError()}
      {signUpForm()}
    </Layout>
  )
}

export default Signup
