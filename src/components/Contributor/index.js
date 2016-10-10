import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import ReactTooltip from 'react-tooltip'
import Statistic from '../Statistic'

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
          <Statistic tooltip='Contributions' icon='repo-push'>{user.totalContributions}</Statistic>
          <Statistic tooltip='Followers' icon='organization'>{user.followers}</Statistic>
          <Statistic tooltip='Public gists' icon='gist'>{user.public_gists}</Statistic>
          <Statistic tooltip='Public repos' icon='repo'>{user.public_repos}</Statistic>
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
