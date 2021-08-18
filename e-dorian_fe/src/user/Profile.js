import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Redirect } from 'react-router-dom'
import { read, update, updateUser } from './apiUser'

const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    address: '',
    error: '',
    succes: false,
  })

  const { token } = isAuthenticated()

  const { name, email, password, succes } = values

  const init = (userId) => {
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true })
      } else {
        setValues({ ...values, name: data.name, email: data.email })
      }
    })
  }

  useEffect(() => {
    init(match.params.userId)
  }, [])

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value })
  }

  const clickSubmit = (e) => {
    e.preventDefault(
      update(match.params.userId, token, { name, email, password }).then(
        (data) => {
          if (data.error) {
            console.log(data.error)
          } else {
            updateUser(data, () => {
              setValues({
                ...values,
                name: data.name,
                email: data.email,
                succes: true,
              })
            })
          }
        }
      )
    )
  }

  const redirectUser = (succes) => {
    if (succes) {
      return <Redirect to='/user/dashboard' />
    }
  }

  const profileUpdate = (name, email, password) => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          type='text'
          onChange={handleChange('name')}
          className='form-control'
          value={name}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          type='email'
          onChange={handleChange('email')}
          className='form-control'
          value={email}
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          type='password'
          onChange={handleChange('password')}
          className='form-control'
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className='btn btn-primary'>
        Potvrdit
      </button>
    </form>
  )

  return (
    <Layout
      title='Profile'
      description='Dorianův Eshop'
      className='container-fluid'
    >
      <h2 className='mb-4'>Profile update</h2>
      {profileUpdate(name, email, password)}
      {redirectUser(succes)}
    </Layout>
  )
}

export default Profile
