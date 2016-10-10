import React from 'react'
import { IndexLink } from 'react-router'
import './Header.scss'

export const Header = () => (
  <nav className='navbar navbar-default navbar-fixed-top header'>
    <div className='header-content'>
      <IndexLink to='/' className='back-button glyphicon glyphicon-menu-left' activeClassName='hide' />
      <div className='container'>
        <div className='navbar-brand'>
          <img alt='#' className='angular-icon' src='https://worldvectorlogo.com/logos/angular-icon.svg' />
          <span>ngularank</span>
        </div>
      </div>
    </div>
  </nav>
)

export default Header
