import { combineReducers } from 'redux'
import locationReducer from './location'
import { pendingTasksReducer as pendingTasks } from 'react-redux-spinner'
import { githubReducer } from '../modules/github'
import { activeFilterReducer, filterExpandedReducer } from '../modules/filters'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    github: githubReducer,
    activeFilter: activeFilterReducer,
    filterExpanded: filterExpandedReducer,
    pendingTasks,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
