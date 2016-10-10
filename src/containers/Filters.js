import { connect } from 'react-redux'
import { setActiveFilter, toggleFilter, FILTER } from '../modules/filters'

import Filters from '../components/Filters'

const mapDispatchToProps = {
  setActiveFilter,
  toggleFilter
}

const mapStateToProps = (state) => ({
  activeFilter: state.activeFilter,
  filters: FILTER,
  filterExpanded: state.filterExpanded
})

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
