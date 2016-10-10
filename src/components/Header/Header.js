import React from 'react'
import { IndexLink } from 'react-router'
import './Header.scss'

export const Header = () => (
  <nav className='navbar navbar-default navbar-fixed-top header'>
    <div className='back-button-container' activeClassName='hide'>
      <IndexLink to='/' className='back-button'>
        <span className='glyphicon glyphicon-menu-left' aria-hidden='true' />
      </IndexLink>
    </div>
    <div className='container'>
      <h1 className='navbar-brand'>Angularank</h1>
    </div>
  </nav>
)

export default Header
