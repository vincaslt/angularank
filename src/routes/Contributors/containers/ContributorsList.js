import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPeople } from '../../../modules/github'

import { default as Contributors } from '../components/ContributorsList'

const mapStateToProps = ({ github }) => ({
  people : github.people
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
