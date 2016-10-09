import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Contributors from './Contributors'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Contributors
})

export default createRoutes
