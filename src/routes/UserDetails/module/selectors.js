import { createSelector } from 'reselect'

const getRepositories = (state) => state.github.repositories

export const getUserDetails = (state, props) => (
  state.github.people.find(user => user.login === props.routeParams.user) || null
)

export const getUserAngularRepositories = createSelector(
  [ getRepositories, getUserDetails ],
  (repositories, user) => {
    return repositories.filter(repo => (
      !!user.contributions.find(contribution => contribution.repositoryId === repo.id)
    ))
  }
)
