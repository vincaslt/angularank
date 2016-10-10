import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import UserInfoEntry from '../UserInfoEntry'
import ReactTooltip from 'react-tooltip'

import './styles.scss'

const AngularRepository = ({ repo }) => {
  return (
    <div className='angular-repo'>
      <div className='angular-repo-name'>
        <Link to={`/repo/${repo.id}`}>
          {repo.name}
        </Link>
      </div>
      <UserInfoEntry prop={repo.contributions} icon='repo-push' tooltip='Contributions'>
        {repo.contributions}
      </UserInfoEntry>
      <UserInfoEntry prop={repo.stargazers_count} icon='star' tooltip='Stars'>
        {repo.stargazers_count}
      </UserInfoEntry>
      <ReactTooltip place='left' effect='solid' />
    </div>
  )
}

AngularRepository.propTypes = {
  repo: PropTypes.object.isRequired
}

export default AngularRepository
