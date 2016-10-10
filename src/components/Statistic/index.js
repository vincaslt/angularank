import React, { PropTypes } from 'react'

import './styles.scss'

const Statistic = ({ tooltip, children, icon }) => (
  <div data-tip={tooltip} className='statistic-container'>
    <span className={`octicon octicon-${icon} statistics-icon`} />
    <span className='statistic-text'>{children}</span>
  </div>
)

Statistic.propTypes = {
  tooltip: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  icon: PropTypes.string.isRequired
}

export default Statistic
