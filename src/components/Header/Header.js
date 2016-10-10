import React from 'react'
import { IndexLink } from 'react-router'
import './Header.scss'

export const Header = () => (
  <nav className='navbar navbar-default navbar-fixed-top header'>
    <div className='back-button-container'>
      <IndexLink to='/' className='back-button glyphicon glyphicon-menu-left' activeClassName='hide' />
    </div>
    <div className='container'>
      <h1 className='navbar-brand'>Angularank</h1>
    </div>
  </nav>
)

export default Header
