import React from 'react'
import Header from '../../components/Header'
import './CoreLayout.scss'
import '../../styles/core.scss'
import { Spinner } from 'react-redux-spinner'

export const CoreLayout = ({ children }) => (
  <div className='container text-center'>
    <Header />
    <Spinner />
    <div className='core-layout__viewport'>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
