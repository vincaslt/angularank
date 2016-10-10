import { pendingTask, begin, end } from 'react-redux-spinner'
import GitHub from 'github-api'
import axios from 'axios'

const AR_API_URL = 'http://localhost:8080'
const API_TOKEN = 'f6e4d10c1141bbc2082b73173900ac8f27aa04e3'
export const gh = new GitHub({
  token: API_TOKEN
})

// Actions
const REQUEST_REPOSITORIES = 'REQUEST_REPOSITORIES'
const RECEIVE_REPOSITORIES = 'RECEIVE_REPOSITORIES'

const REQUEST_PEOPLE = 'REQUEST_PEOPLE'
const RECEIVE_PEOPLE = 'RECEIVE_PEOPLE'

// Action creators
export const genericRequest = (type) => ({
  type,
  [pendingTask]: begin
})

const receiveRepositories = (repositories) => ({
  type: RECEIVE_REPOSITORIES,
  [pendingTask]: end,
  repositories
})

const receivePeople = (people) => ({
  type: RECEIVE_PEOPLE,
  [pendingTask]: end,
  people
})

// Thunks
export const fetchRepositories = () => dispatch => {
  dispatch(genericRequest(REQUEST_REPOSITORIES))
  return gh.getOrganization('angular').getRepos()
    .then(repos => dispatch(receiveRepositories(repos.data)))
}

export const fetchPeople = () => dispatch => {
  dispatch(genericRequest(REQUEST_PEOPLE))
  return axios.get(AR_API_URL + '/contributors')
    .then(({ data }) => data.map(user => ({
      ...user,
      totalContributions: user.contributions.reduce((total, repo) => (
        total + repo.contributions
      ), 0)
    })))
    .then(people => dispatch(receivePeople(people)))
}

// Action handlers
const ACTION_HANDLERS = {
  [RECEIVE_REPOSITORIES]: (state, { repositories }) => ({
    ...state,
    repositories: repositories
  }),
  [RECEIVE_PEOPLE]: (state, { people }) => ({
    ...state,
    people: people
  })
}

const initialState = {
  people: [],
  repositories: []
}

// Reducers
export function githubReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
