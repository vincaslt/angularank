import React, { PropTypes } from 'react'

const UserDetailsView = ({ user, angularRepos }) => {
  const angularReposList = angularRepos.map(repo => (
    <div key={repo.id}>
      {repo.full_name}
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
