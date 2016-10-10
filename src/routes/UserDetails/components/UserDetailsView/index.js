import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'
import moment from 'moment'
import AngularRepository from '../AngularRepository'
import UserInfoEntry from '../UserInfoEntry'

import './styles.scss'

const UserDetailsView = ({ user, angularRepos = [] }) => {
  let angularReposList = (
    <div>
      This person is a member of Angular organization, but has not personally contributed anything yet
    </div>
  )
  if (angularRepos.length > 0) {
    const angularReposListItems = angularRepos.map(repo => (
      <AngularRepository key={repo.id} repo={repo} />
    ))

    angularReposList = <div className='angular-repos-list'>{angularReposListItems}</div>
  }

  const loginName = user.name && user.login ? (
    <div className='user-login'>{user.login}</div>
  ) : null

  return (
    <div className='user-details-view'>
      <div className='user-details-container'>
        <img className='user-photo' src={user.avatar_url} />
        <div className='user-main-info'>
          <a
            href={`https://github.com/${user.login}`}
            className='title-text'
          >
            {user.name || user.login}
          </a>
          {loginName}
          <div className='user-bio'>{user.bio}</div>
        </div>
      </div>
      <div className='user-content'>
        <div className='user-angular-repositories-container'>
          <div className='group-title'>Angular Repositories</div>
          {angularReposList}
        </div>

        <div className='side-info'>
          <div className='user-info-container'>
            <div className='group-title'>Information</div>
            <UserInfoEntry prop={user.followers} icon='organization' tooltip='Followers'>
              <a href={`https://github.com/${user.login}?tab=followers`}>{user.followers}</a>
            </UserInfoEntry>
            <UserInfoEntry prop={user.email} icon='mail' tooltip='Email'>
              <a href={'mailto:' + user.email}>{user.email}</a>
            </UserInfoEntry>
            <UserInfoEntry prop={user.blog} icon='link' tooltip='Website'>
              <a href={user.blog}>{user.blog}</a>
            </UserInfoEntry>
            <UserInfoEntry prop={user.public_repos} icon='repo' tooltip='Repos'>
              <a href={`https://github.com/${user.login}?tab=repositories`}>{user.public_repos}</a>
            </UserInfoEntry>
            <UserInfoEntry prop={user.totalContributions} icon='repo-push' tooltip='Contributions'>
              {user.totalContributions}
            </UserInfoEntry>
            <UserInfoEntry prop={user.public_gists} icon='gist' tooltip='Gists'>
              {user.public_gists}
            </UserInfoEntry>
            <UserInfoEntry prop={user.company} icon='briefcase' tooltip='Company'>
              {user.company}
            </UserInfoEntry>
            <UserInfoEntry prop={user.location} icon='location' tooltip='Location'>
              {user.location}
            </UserInfoEntry>
            <UserInfoEntry prop={user.created_at} icon='calendar' tooltip='Joined'>
              {moment(user.created_at).format('YYYY-MM-DD')}
            </UserInfoEntry>
            {user.hireable ? <div><i>Available for hire!</i></div> : null}
          </div>

          <div className='user-info-container'>
            TODO: user repos
          </div>
        </div>
      </div>
      <ReactTooltip place='left' effect='solid' />
    </div>
  )
}

UserDetailsView.propTypes = {
  user: PropTypes.object.isRequired, // User from github.people in store
  angularRepos: PropTypes.array.isRequired
}

export default UserDetailsView
