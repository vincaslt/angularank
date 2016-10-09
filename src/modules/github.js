import { pendingTask, begin, end } from 'react-redux-spinner'
import GitHub from 'github-api'
import axios from 'axios'

const AR_API_URL = 'http://localhost:8080'
const API_TOKEN = 'f6e4d10c1141bbc2082b73173900ac8f27aa04e3'
const gh = new GitHub({
  token: API_TOKEN
})

// Actions
const REQUEST_REPOSITORIES = 'REQUEST_REPOSITORIES'
const RECEIVE_REPOSITORIES = 'RECEIVE_REPOSITORIES'

const REQUEST_PEOPLE = 'REQUEST_PEOPLE'
const RECEIVE_PEOPLE = 'RECEIVE_PEOPLE'

const REQUEST_CONTRIBUTIONS_MAPPING = 'REQUEST_CONTRIBUTIONS_MAPPING'
const RECEIVE_CONTRIBUTIONS_MAPPING = 'RECEIVE_CONTRIBUTIONS_MAPPING'

// Action creators
const genericRequest = (type) => ({
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

const receiveContributionsMapping = (contributions) => ({
  type: RECEIVE_CONTRIBUTIONS_MAPPING,
  [pendingTask]: end,
  contributions
})

// Thunks
export const fetchRepositories = () => dispatch => {
  dispatch(genericRequest(REQUEST_REPOSITORIES))
  return gh.getOrganization('angular').getRepos()
    .then(repos => dispatch(receiveRepositories(repos.data)))
}

export const fetchPeople = () => dispatch => {
  dispatch(genericRequest(REQUEST_PEOPLE))
  return gh.getOrganization('angular').listMembers()
    .then((members) => dispatch(receivePeople(members.data)))
}

export const fetchContributionsMapping = () => dispatch => {
  dispatch(genericRequest(REQUEST_CONTRIBUTIONS_MAPPING))
  return axios.get(AR_API_URL + '/repos')
    .then((contributions) => dispatch(receiveContributionsMapping(contributions.data)))
}

// Action handlers
const ACTION_HANDLERS = {
  [RECEIVE_REPOSITORIES]: (state, { repositories }) => ({
    ...state,
    repositories: flatten(repositories)
  }),
  [RECEIVE_PEOPLE]: (state, { people }) => ({
    ...state,
    people: flatten(people)
  }),
  [RECEIVE_CONTRIBUTIONS_MAPPING]: (state, { contributions }) => ({
    ...state,
    contributions: flatten(contributions)
  })
}

// Reducers
export function githubReducer (state = {}, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

// private utils
function flatten (array) {
  return array.reduce((obj, val) => ({
    [val.id]: val,
    ...obj
  }), {})
}
