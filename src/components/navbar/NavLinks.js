import React, { useContext } from 'react'

import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import NavActiveContext from '../../stores/navActive-context'
import FavoriteContext from '../../stores/favorite-context'
import AuthContext from '../../stores/auth-context'
import NavUser from './NavUser'
import { ADD_PAGE, ALL_PAGE, FAV_PAGE } from '../../constants/_tabName'

import styles from './NavLinks.module.scss'

function NavLinks() {
  const { active, handleActiveTab } = useContext(NavActiveContext)
  const { totalFavorites } = useContext(FavoriteContext)
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <Nav className="mr-auto">
      {isLoggedIn && (
        <>
          <Link
            to={'/'}
            className={`${
              active === ALL_PAGE ? styles.active : styles.navLinks
            }`}
            onClick={() => {
              handleActiveTab(ALL_PAGE)
            }}
          >
            Your Gallery
          </Link>
          <Link
            to={'/add-pics'}
            className={`${
              active === ADD_PAGE ? styles.active : styles.navLinks
            }`}
            onClick={() => {
              handleActiveTab(ADD_PAGE)
            }}
          >
            Add Gallery
          </Link>
          <Link
            to={'/favorite-pics'}
            className={`${
              active === FAV_PAGE ? styles.active : styles.navLinks
            }`}
            onClick={() => {
              handleActiveTab(FAV_PAGE)
            }}
          >
            Favorite Gallery{' '}
            <span className={styles.totalFavorite}>{totalFavorites}</span>
          </Link>
        </>
      )}
      <NavUser />
    </Nav>
  )
}

export default NavLinks
