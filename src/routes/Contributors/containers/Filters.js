import { connect } from 'react-redux'
import { setActiveFilter, FILTER } from '../modules/filters'

import Filters from '../components/Filters'

const mapDispatchToProps = {
  setActiveFilter
}

const mapStateToProps = (state) => ({
  activeFilter: state.activeFilter,
  filters: FILTER
})

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
