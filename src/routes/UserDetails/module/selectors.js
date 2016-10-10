import { createSelector } from 'reselect'

const getRepositories = (state) => state.github.repositories
export const getUserDetails = (state, props) => (
  state.github.people.find(user => user.login === props.routeParams.user) || null
)
export const getUserRepos = (state, props) => state.usersRepos[props.routeParams.user] || null

export const getUserWithRepos = createSelector(
  [getUserDetails, getUserRepos],
  (user, userRepos) => ({
    ...user,
    userRepos
  })
)

export const getUserAngularRepositories = createSelector(
  [ getRepositories, getUserWithRepos ],
  (repositories, user) => {
    const angularRepos = []
    repositories.forEach(repo => {
      const angularRepo = user.contributions.find(contribution => contribution.repositoryId === repo.id)
      if (angularRepo && angularRepo.contributions > 0) {
        angularRepos.push({
          ...repo,
          contributions: angularRepo.contributions
        })
      }
    })

    return angularRepos
  }
)
