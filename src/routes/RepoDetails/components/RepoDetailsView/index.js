import React, { PropTypes } from 'react'
import ContributorsList from '../../../../components/ContributorsList'
import Filters from '../../../../containers/Filters'

import './styles.scss'

/*
  user.totalContributions -> replaced with total contributions to this specific repo
*/
const RepoDetailsView = ({ repository, contributors }) => {
  return (
    <div>
      <Filters />
      <h1>{repository.full_name})</h1>
      <div>
        <div className='repository-details-container'>
          <li>Stars: {repository.stargazers_count}</li>
          <li>Watchers: {repository.watchers_count}</li>
          <li>Forks: {repository.forks_count}</li>
          <li>Issues: {repository.open_issues}</li>
          <li>Created at: {repository.created_at}</li>
          <li>Last updated: {repository.updated_at}</li>
        </div>
        <div className='contributors-list-container'>
          <div className='group-title'>Contributors</div>
          <div>
            <ContributorsList people={contributors} />
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
