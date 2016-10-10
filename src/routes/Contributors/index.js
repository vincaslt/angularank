import { injectReducer } from '../../store/reducers'

export default (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const ContributorsView = require('./components/ContributorsView').default
      const reducer = require('./modules/filters').default

      injectReducer(store, { key: 'activeFilter', reducer })

      cb(null, ContributorsView)
    })
  }
})
