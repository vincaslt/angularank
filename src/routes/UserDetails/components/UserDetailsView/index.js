import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import './styles.scss'

const UserDetailsView = ({ user, angularRepos }) => {
  const angularReposList = angularRepos.map(repo => (
    <div key={repo.id}>
      <Link to={`/repo/${repo.id}`}>{repo.full_name}</Link>
      <span> - {repo.contributions}</span>
    </div>
  ))

  const loginName = user.name && user.login ? (
    <div className='user-login'>{user.login}</div>
  ) : null

  return (
    <div>
      <div className='user-details-container'>
        <img className='user-photo' src={user.avatar_url} />
        <div className='user-main-info'>
          <div className='user-name'>{user.name || user.login}</div>
          {loginName}
          <div className='user-bio'>{user.bio}</div>
        </div>

      </div>

      <div>
        <h1>Angular Repositories</h1>
        <div>{angularReposList}</div>
      </div>
    </div>
  )
}

UserDetailsView.propTypes = {
  user: PropTypes.object.isRequired, // User from github.people in store
  angularRepos: PropTypes.array.isRequired
}

export default UserDetailsView
