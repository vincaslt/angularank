import React from 'react'
import Header from '../../components/Header'
import './CoreLayout.scss'
import '../../styles/core.scss'
import { Spinner } from 'react-redux-spinner'

export const CoreLayout = ({ children }) => (
  <div>
    <Header />
    <Spinner />
    <div className='main-content'>
      <div className='container'>
        {children}
      </div>
    </div>
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
