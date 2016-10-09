import { combineReducers } from 'redux'
import locationReducer from './location'
import { pendingTasksReducer as pendingTasks } from 'react-redux-spinner'
import { githubReducer } from '../modules/github'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    github: githubReducer,
    pendingTasks,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
