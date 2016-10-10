import { createSelector } from 'reselect'

const getActiveFilter = (state) => state.activeFilter
const getPeople = (state) => state.github.people

export const getRepoDetails = (state, props) => (
  state.github.repositories.find(repo => repo.id === Number(props.routeParams.repo)) || null
)

export const getContributors = createSelector(
  [ getPeople, getRepoDetails, getActiveFilter ],
  (people = [], repository, filterProperty) => {
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

    return contributors.sort((a, b) => b[filterProperty] - a[filterProperty])
  }
)
