import { createSelector } from 'reselect'

const getPeople = (state) => state.github.people

export const getRepoDetails = (state, props) => (
  state.github.repositories.find(repo => repo.id === Number(props.routeParams.repo)) || null
)

export const getContributors = createSelector(
  [ getPeople, getRepoDetails ],
  (people = [], repository) => {
    const contributors = []
    people.forEach(user => {
      const angularRepo = user.contributions.find(repo => (
        repository && repo.repositoryId === repository.id
      ))

      if (angularRepo && angularRepo.contributions > 0) {
        contributors.push({
          ...user,
          totalContributions: angularRepo.contributions
        })
      }
    })

    return contributors
  }
)
