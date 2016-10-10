import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const UserDetailsView = ({ user, angularRepos }) => {
  const angularReposList = angularRepos.map(repo => (
    <div key={repo.id}>
      <Link to={`/repo/${repo.id}`}>{repo.full_name}</Link>
      <span> - {repo.contributions}</span>
    </div>
  ))

  return (
    <div>
      <h1>{user.name} ({user.login})</h1>
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
