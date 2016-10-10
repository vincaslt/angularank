import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPeople } from '../../../modules/github'
import { getSortedPeople } from '../modules/selectors'

import { default as Contributors } from '../components/ContributorsList'

const mapStateToProps = (state) => ({
  people: getSortedPeople(state)
})

const mapDispatchToProps = {
  fetchPeople
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ContributorsListContainer extends Component {
  static propTypes = {
    people: PropTypes.array.isRequired,
    fetchPeople: PropTypes.func.isRequired
  }

  componentWillMount () {
    const { people, fetchPeople } = this.props
    if (!people || people.length === 0) {
      fetchPeople()
    }
  }

  render () {
    return (
      <div>
        <Contributors people={this.props.people} />
      </div>
    )
  }
}
