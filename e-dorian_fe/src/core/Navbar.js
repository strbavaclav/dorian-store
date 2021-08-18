import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { signout, isAuthenticated } from '../auth'
import { itemTotal } from './Cart/cartHelpers'

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#ff9900' }
  } else {
    return { color: '#ffffff' }
  }
}

const Navbar = ({ history }) => (
  <div className='wrapper'>
    <header>
      <nav>
        <div className='menu-icon'>
          <i className='fa fa-bars fa-2x'></i>
        </div>
        <div className='logo'>LOGO</div>
        <div className='menu'>
          <ul>
            <li>
              <Link>HOME</Link>
              <Link>About</Link>
              <Link>Blog</Link>
              <Link>Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  </div>
)

export default withRouter(Navbar)
