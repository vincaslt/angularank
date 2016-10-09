import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const ContributorsList = ({ people }) => {
  const list = people.map(user => (
    <li key={user.id}>
      <Link to={`/user/${user.login}`}>{user.name || user.login}</Link>
      {
        `-
        c:${user.totalContributions}
        f:${user.followers}
        r:${user.public_repos}
        g:${user.public_gists}`
      }
    </li>
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
