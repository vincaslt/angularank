import { pendingTask, end } from 'react-redux-spinner'
import { gh, genericRequest } from '../../../modules/github'

// Actions
const REQUEST_USER_REPOSITORIES = 'REQUEST_USER_REPOSITORIES'
const RECEIVE_USER_REPOSITORIES = 'RECEIVE_USER_REPOSITORIES'

// Action creators
const receiveUserRepositories = (user, repositories) => ({
  type: RECEIVE_USER_REPOSITORIES,
  [pendingTask]: end,
  user,
  repositories
})

// Thunks
export const fetchUserRepositories = (user) => dispatch => {
  dispatch(genericRequest(REQUEST_USER_REPOSITORIES))
  return gh.getUser(user).listRepos({ type: 'owner' })
    .then(repos => dispatch(receiveUserRepositories(user, repos.data)))
}

// Action handlers
const ACTION_HANDLERS = {
  [RECEIVE_USER_REPOSITORIES]: (state, { user, repositories }) => ({
    ...state,
    [user]: repositories
  })
}

// Reducers
export default function userReposReducer (state = {}, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
