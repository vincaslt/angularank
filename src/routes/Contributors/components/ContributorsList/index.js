import React, { PropTypes } from 'react'
import Contributor from '../Contributor'

import './styles.scss'

const ContributorsList = ({ people }) => {
  const contributorListItems = people.map(user => (
    <Contributor key={user.id} user={user} />
  ))

  return (
    <div className='contributors-list'>
      {contributorListItems}
    </div>
  )
}

ContributorsList.propTypes = {
  people : PropTypes.array.isRequired
}

export default ContributorsList
