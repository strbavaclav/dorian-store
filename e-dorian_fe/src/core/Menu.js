import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { signout, isAuthenticated } from '../auth'
import { itemTotal } from './Cart/cartHelpers'
import logo from '../logo.png'

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#ff9900' }
  } else {
    return { color: '#ffffff' }
  }
}

const Menu = ({ history }) => (
  <>
    <nav className='navbar navbar-expand-lg navbar-light bg-dark height'>
      <a className='navbar-brand ml-5' href='/'>
        <img src={logo} alt='Logo' style={{ width: '50px' }} />
      </a>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon' />
      </button>

      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav m-auto'>
          <li className='nav-item'>
            <Link
              className='nav-link text-uppercase'
              style={isActive(history, '/')}
              to='/'
            >
              <i className='fas fa-home'></i>
            </Link>
          </li>

          <li className='nav-item'>
            <Link
              className='nav-link text-uppercase ml-5'
              style={isActive(history, '/shop')}
              to='/shop'
            >
              Produkty
            </Link>
          </li>
        </ul>

        <ul className='navbar-nav m-auto'>
          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className='nav-item'>
              <Link
                className='nav-link  text-uppercase ml-5'
                style={isActive(history, '/user/dashboard')}
                to='/user/dashboard'
              >
                Profil
              </Link>
            </li>
          )}

          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className='nav-item'>
              <Link
                className='nav-link  text-uppercase ml-5'
                style={isActive(history, '/admin/dashboard')}
                to='/admin/dashboard'
              >
                Manažer
              </Link>
            </li>
          )}

          {!isAuthenticated() && (
            <>
              <li className='nav-item'>
                <Link
                  className='nav-link  text-uppercase ml-5'
                  style={isActive(history, '/signin')}
                  to='/signin'
                >
                  Přihlásit se
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className='nav-link  text-uppercase ml-5'
                  style={isActive(history, '/signup')}
                  to='/signup'
                >
                  Zaregistrovat
                </Link>
              </li>
            </>
          )}

          {isAuthenticated() && (
            <li className='nav-item'>
              <span
                className='nav-link  text-uppercase ml-5'
                style={{ cursor: 'pointer', color: '#ffffff' }}
                onClick={() =>
                  signout(() => {
                    history.push('/')
                  })
                }
              >
                Odhlásit se
              </span>
            </li>
          )}

          <li className='nav-item'>
            <Link
              className='nav-link  text-uppercase ml-5 my-sm-0'
              style={isActive(history, '/cart')}
              to='/cart'
            >
              <i className='fas fa-shopping-cart'></i>

              <sup>
                <small className='cart-badge'>{itemTotal()}</small>
              </sup>
            </Link>
          </li>
        </ul>
      </div>
    </nav>

    <div className='navbar navbar-expand-lg navbar-light bg-dark height'></div>
  </>
)

export default withRouter(Menu)
