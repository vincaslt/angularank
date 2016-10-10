import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPeople, fetchRepositories } from '../../../modules/github'
import { getContributors, getRepoDetails } from '../module/selectors'

import { default as RepoDetails } from '../components/RepoDetailsView'

const mapStateToProps = (state, props) => ({
  people: getContributors(state, props),
  repository: getRepoDetails(state, props)
})

const mapDispatchToProps = {
  fetchPeople,
  fetchRepositories
}

@connect(mapStateToProps, mapDispatchToProps)
export default class RepoDetailsView extends Component {
  static propTypes = {
    people: PropTypes.array.isRequired,
    fetchPeople: PropTypes.func.isRequired,
    fetchRepositories: PropTypes.func.isRequired,
    routeParams: PropTypes.object.isRequired,
    repository: PropTypes.object
  }

  componentWillMount () {
    const {
      people,
      repository,
      fetchPeople,
      fetchRepositories
    } = this.props

    if (!people || people.length === 0) {
      fetchPeople()
    }

    if (!repository) {
      fetchRepositories()
    }
  }

  render () {
    const { people, repository } = this.props
    const repoDetailsComponent = repository ? (
      <RepoDetails contributors={people} repository={repository} />
    ) : 'Loading...'
    return (
      <div>
        {repoDetailsComponent}
      </div>
    )
  }
}
