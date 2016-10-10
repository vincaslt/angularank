import React, { PropTypes, Component } from 'react'

import './styles.scss'

export default class Filters extends Component {
  static propTypes = {
    setActiveFilter: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
    activeFilter: PropTypes.string.isRequired,
    toggleFilter: PropTypes.func.isRequired,
    filterExpanded: PropTypes.bool
  }

  render () {
    const {
      setActiveFilter,
      filters,
      activeFilter,
      filterExpanded = false,
      toggleFilter
    } = this.props

    const filterListItems = Object.entries(filters).map(([key, filter]) => {
      const filterLink = activeFilter !== key ? (
        <a href='#' className='filter-option' onClick={() => setActiveFilter(key)}>{filter}</a>
      ) : <div><span className='octicon octicon-chevron-right' />{filter}</div>

      return (
        <div key={key}>
          {filterLink}
        </div>
      )
    })

    let filterView = (
      <div className='filter-toggle' onClick={() => toggleFilter(!filterExpanded)}>
        <span className='glyphicon glyphicon-filter filter-icon' aria-hidden='true' />
      </div>
    )

    if (filterExpanded) {
      filterView = (
        <div>
          {filterView}
          <div className='filter-content'>
            {filterListItems}
          </div>
        </div>
      )
    }

    return (
      <div className='filter-container'>
        {filterView}
      </div>
    )
  }
}
