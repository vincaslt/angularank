import React, { PropTypes } from 'react'
import { Link } from 'react-router'

/*
  user.totalContributions -> replaced with total contributions to this specific repo
*/
const RepoDetailsView = ({ repository, contributors }) => {
  const contributorsListItems = contributors.map(user => (
    <li key={user.id}>
      <Link to={`/user/${user.login}`}>{user.name} ({user.login})</Link> - {user.totalContributions}
    </li>
  ))

  return (
    <div>
      <h1>{repository.full_name})</h1>
      <div>
        <ul>
          <li>Stars: {repository.stargazers_count}</li>
          <li>Watchers: {repository.watchers_count}</li>
          <li>Forks: {repository.forks_count}</li>
          <li>Issues: {repository.open_issues}</li>
          <li>Created at: {repository.created_at}</li>
          <li>Last updated: {repository.updated_at}</li>
        </ul>
        <div>
          <h2>Organization members who contributed</h2>
          <div>
            <ul>
              {contributorsListItems}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

RepoDetailsView.propTypes = {
  repository: PropTypes.object.isRequired,
  contributors: PropTypes.array.isRequired
}

export default RepoDetailsView
