import { injectReducer } from '../../store/reducers'

export default (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const ContributorsView = require('./components/ContributorsView').default
      const modules = require('./modules/filters')

      injectReducer(store, { key: 'activeFilter', reducer: modules.activeFilterReducer })
      injectReducer(store, { key: 'filterExpanded', reducer: modules.filterExpandedReducer })

      cb(null, ContributorsView)
    })
  }
})
