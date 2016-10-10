export const FILTER = {
  'totalContributions': 'Contributions',
  'followers': 'Followers',
  'public_gists': 'public gists',
  'public_repos': 'Public repositories'
}

const SET_ACTIVE_FILTER = 'SET_ACTIVE_FILTER'

export const setActiveFilter = (filter) => ({
  type: SET_ACTIVE_FILTER,
  filter
})

const ACTION_HANDLERS = {
  [SET_ACTIVE_FILTER] : (state, action) => action.filter
}

export default function activeFilterReducer (state = 'totalContributions', action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
