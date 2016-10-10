import React, { PropTypes } from 'react'

const Statistic = ({ tooltip, text, icon }) => (
  <div data-tip={tooltip} className='statistic-container'>
    <span className={`octicon octicon-${icon} statistics-icon`} />
    <span className='statistic-text'>{text}</span>
  </div>
)

Statistic.propTypes = {
  tooltip: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  icon: PropTypes.string.isRequired
}

export default Statistic
