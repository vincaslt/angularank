import React from 'react'
import { IndexLink } from 'react-router'
import './Header.scss'

export const Header = () => (
  <div>
    <h1>Angularank</h1>
    <IndexLink to='/' activeClassName='route--active'>
      Rankings
    </IndexLink>
  </div>
)

export default Header
