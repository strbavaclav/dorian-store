import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Layout from '../core/Layout'
import { signin, authenticate, isAuthenticated } from '../auth'

const Signin = () => {
  const [values, setValues] = useState({
    email: 'admin@admin.cz',
    password: 'admin123',
    error: '',
    loading: false,
    redirectToReferrer: false,
  })

  const { email, password, loading, error, redirectToReferrer } = values
  const { user } = isAuthenticated()

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }

  const clickSubmit = (event) => {
    setValues({ ...values, error: false, loading: true })
    event.preventDefault()
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false })
      } else {
        authenticate(data, () =>
          setValues({
            ...values,
            redirectToReferrer: true,
          })
        )
      }
    })
  }

  const signUpForm = () => (
    <form>
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
        Přihlásit se
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

  const showLoading = () =>
    loading && <div className='alert alert-info'>Loading...</div>

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to='/admin/dashboard' />
      } else {
        return <Redirect to='/' />
      }
    }
    if (isAuthenticated()) {
      return <Redirect to='/' />
    }
  }

  return (
    <Layout
      title='Sign in'
      description='Sign in here'
      className='container col-md-8 offset-md-2'
    >
      {showLoading()}
      {showError()}
      {signUpForm()}
      {redirectUser()}
    </Layout>
  )
}

export default Signin
