import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import ReactTooltip from 'react-tooltip'

import './styles.scss'

const Contributor = ({ user }) => {
  const loginNameItem = user.name && user.login ? (
    <small className='user-login-name'>({user.login})</small>
  ) : null

  const bioItem = user.bio ? (
    <div className='contributor-bio'>{user.bio}</div>
  ) : null

  return (
    <div className='contributor'>
      <div className='user-avatar-container'>
        <img className='user-avatar' src={user.avatar_url} />
      </div>
      <div className='contributor-info-container'>
        <div className='contributor-name'>
          <Link
            to={`/user/${user.login}`}
          >
            {user.name || user.login}
            {loginNameItem}
          </Link>
          <span className='span-grow' />
        </div>
        {bioItem}
        <div className='contributor-statistics'>
          <div data-tip='Contributions'>
            <span className='octicon octicon-repo-push statistics-icon' />
            <span>{user.totalContributions}</span>
          </div>
          <div data-tip='Followers'>
            <span className='octicon octicon-organization statistics-icon' />
            <span>{user.followers}</span>
          </div>
          <div data-tip='Public gists'>
            <span className='octicon octicon-gist statistics-icon' />
            <span>{user.public_gists}</span>
          </div>
          <div data-tip='Public repos'>
            <span className='octicon octicon-repo statistics-icon' />
            <span>{user.public_repos}</span>
          </div>
        </div>
      </div>
      <ReactTooltip place='bottom' effect='solid' />
    </div>
  )
}

Contributor.propTypes = {
  user: PropTypes.object.isRequired
}

export default Contributor
