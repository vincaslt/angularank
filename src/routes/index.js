import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Contributors from './Contributors'
import UserDetailsRoute from './UserDetails'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Contributors(store),
  childRoutes : [
    UserDetailsRoute
  ]
})

export default createRoutes
