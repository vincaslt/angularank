import React, { PropTypes } from 'react'
import ContributorsList from '../../../../components/ContributorsList'
import Filters from '../../../../containers/Filters'
import Statistic from '../../../../components/Statistic'

import './styles.scss'
import ribbonImage from './assets/ribbon.png'

/*
  user.totalContributions -> replaced with total contributions to this specific repo
*/
const RepoDetailsView = ({ repository, contributors }) => {
  const description = repository.description ? <p>{repository.description}</p> : null

  return (
    <div className='repository-details-view'>
      <Filters />

      <a className='title-text repo-name' href={`https://github.com/${repository.full_name}`}>
        {repository.full_name}
      </a>
      {description}
      <div className='repository-details-container'>
        <a href={repository.html_url}>
          <img className='repo-ribbon'
            src={ribbonImage}
            alt='Fork me on GitHub'
          />
        </a>
        <Statistic tooltip='Stars' icon='star'>{repository.stargazers_count}</Statistic>
        <Statistic tooltip='Forks' icon='repo-forked'>{repository.forks_count}</Statistic>
        <Statistic tooltip='Issues' icon='issue-opened'>{repository.open_issues}</Statistic>
        <Statistic tooltip='Created at' icon='calendar'>{repository.created_at}</Statistic>
        <Statistic tooltip='Last updated' icon='clock'>{repository.updated_at}</Statistic>
      </div>
      <div className='contributors-list-container'>
        <div className='group-title'>Contributors</div>
        <div>
          <ContributorsList people={contributors} />
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
