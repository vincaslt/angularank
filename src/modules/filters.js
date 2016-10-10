export const FILTER = {
  'totalContributions': 'Contributions',
  'followers': 'Followers',
  'public_gists': 'public gists',
  'public_repos': 'Public repositories'
}

const SET_ACTIVE_FILTER = 'SET_ACTIVE_FILTER'
const TOGGLE_FILTER = 'TOGGLE_FILTER'

export const setActiveFilter = (filter) => ({
  type: SET_ACTIVE_FILTER,
  filter
})

export const toggleFilter = (filterExpanded) => ({
  type: TOGGLE_FILTER,
  filterExpanded
})

const ACTION_HANDLERS = {
  [SET_ACTIVE_FILTER]: (state, action) => action.filter
}

export function activeFilterReducer (state = 'totalContributions', action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

export function filterExpandedReducer (state = false, action) {
  switch (action.type) {
    case TOGGLE_FILTER:
      return action.filterExpanded
    default:
      return state
  }
}
