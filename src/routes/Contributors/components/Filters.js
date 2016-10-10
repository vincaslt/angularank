import React, { PropTypes } from 'react'

const Filters = ({ setActiveFilter, filters, activeFilter }) => {
  const filterListItems = Object.entries(filters).map(([key, filter]) => {
    const filterLink = activeFilter !== key ? (
      <a href='#' onClick={() => setActiveFilter(key)}>{filter}</a>
    ) : <div><u>{filter}</u></div>

    return (
      <li key={key}>
        {filterLink}
      </li>
    )
  })

  return (
    <div>
      <ul>
        {filterListItems}
      </ul>
    </div>
  )
}

Filters.propTypes = {
  setActiveFilter: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  activeFilter: PropTypes.string.isRequired
}

export default Filters
