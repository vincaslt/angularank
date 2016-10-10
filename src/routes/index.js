import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Contributors from './Contributors'
import UserDetailsRoute from './UserDetails'
import RepoDetailsRoute from './RepoDetails'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Contributors(store),
  childRoutes : [
    UserDetailsRoute,
    RepoDetailsRoute
  ]
})

export default createRoutes
