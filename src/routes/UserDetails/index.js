import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'user/:user',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const UserDetailsView = require('./containers/UserDetailsView').default
      const reducer = require('./module/userRepos').default

      injectReducer(store, { key: 'usersRepos', reducer })
      cb(null, UserDetailsView)
    }, 'counter')
  }
})
