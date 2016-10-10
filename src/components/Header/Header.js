import React from 'react'
import { IndexLink } from 'react-router'
import './Header.scss'
import angularIcon from './assets/angular-icon.png'

export const Header = () => (
  <nav className='navbar navbar-default navbar-fixed-top header'>
    <div className='header-content'>
      <IndexLink to='/' className='back-button glyphicon glyphicon-menu-left' activeClassName='hide' />
      <div className='container'>
        <div className='navbar-brand'>
          <img alt='#' className='angular-icon' src={angularIcon} />
          <span>ngularank</span>
        </div>
      </div>
    </div>
  </nav>
)

export default Header
