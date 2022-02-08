import React, { useContext } from 'react'

import { Link } from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap'

import AuthContext from '../../stores/auth-context'
import NavActiveContext from '../../stores/navActive-context'
import { AUTH_PAGE } from '../../constants/_tabName'

import styles from './NavUser.module.scss'

function NavUser() {
  const { isLoggedIn, logout } = useContext(AuthContext)
  const { active, handleActiveTab } = useContext(NavActiveContext)

  let content

  if (isLoggedIn) {
    content = (
      <NavDropdown
        title={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#fff"
            className={`bi bi-person-circle ${styles.navUserIcon}`}
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
        }
        id="basic-nav-dropdown"
        className={`${active === AUTH_PAGE ? styles.active : styles.navLinks}`}
        onClick={() => {
          handleActiveTab(AUTH_PAGE)
        }}
      >
        <NavDropdown.Item
          className={styles.navUserItem}
          onClick={() => isLoggedIn && logout()}
        >
          {isLoggedIn && <Link to={'/auth'}>Logout</Link>}
          {!isLoggedIn && <Link to={'/auth'}>Login/Signup</Link>}
        </NavDropdown.Item>
      </NavDropdown>
    )
  } else {
    content = (
      <Link
        to={'/auth'}
        className={`${active === AUTH_PAGE ? styles.active : styles.navLinks}`}
      >
        Login/Signup
      </Link>
    )
  }

  return <>{content}</>
}

export default NavUser
