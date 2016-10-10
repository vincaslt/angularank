import { createSelector } from 'reselect'

const getActiveFilter = (state) => state.activeFilter
const getPeople = (state) => state.github.people

export const getSortedPeople = createSelector(
  [ getPeople, getActiveFilter ],
  (people, filterProperty) => {
    return Array.from(people).sort((a, b) => b[filterProperty] - a[filterProperty])
  }
)
