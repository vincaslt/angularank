import React, { PropTypes } from 'react'

const ContributorsList = ({ people }) => {
  const list = people.map(user => (
    <li>{`${user.name || user.login} - ${user.totalContributions}`}</li>
  ))

  return (
    <ol>
      {list}
    </ol>
  )
}

ContributorsList.propTypes = {
  people : PropTypes.array.isRequired
}

export default ContributorsList
