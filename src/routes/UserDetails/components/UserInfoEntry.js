import React, { PropTypes } from 'react'

const UserInfoEntry = ({ prop = null, icon, tooltip, children }) => (
  prop ? (
    <div className='user-info-entry'>
      <div data-tip={tooltip}><span className={`octicon octicon-${icon}`} /> {children}</div>
      <span className='span-grow' />
    </div>
  ) : null
)

UserInfoEntry.propTypes = {
  prop: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  icon: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default UserInfoEntry
