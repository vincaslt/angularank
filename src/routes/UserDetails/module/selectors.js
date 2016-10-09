import { createSelector } from 'reselect'

const getRepositories = (state) => state.github.repositories

export const getUserDetails = (state, props) => (
  state.github.people.find(user => user.login === props.routeParams.user) || null
)

export const getUserAngularRepositories = createSelector(
  [ getRepositories, getUserDetails ],
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
