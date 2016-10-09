import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPeople, fetchRepositories } from '../../../modules/github'
import { getUserDetails, getUserAngularRepositories } from '../module/selectors'

import { default as UserDetails } from '../components/UserDetailsView'

const mapStateToProps = (state, props) => ({
  user: getUserDetails(state, props),
  people: state.github.people,
  angularRepos: getUserAngularRepositories(state, props)
})

const mapDispatchToProps = {
  fetchPeople,
  fetchRepositories
}

@connect(mapStateToProps, mapDispatchToProps)
export default class UserDetailsView extends Component {
  static propTypes = {
    angularRepos: PropTypes.array.isRequired,
    people: PropTypes.array.isRequired,
    fetchPeople: PropTypes.func.isRequired,
    fetchRepositories: PropTypes.func.isRequired,
    routeParams: PropTypes.object.isRequired,
    user: PropTypes.object
  }

  componentWillMount () {
    const {
      people,
      fetchPeople,
      angularRepos,
      fetchRepositories
    } = this.props

    if (!people || people.length === 0) {
      fetchPeople()
    }

    if (!angularRepos || angularRepos.length === 0) {
      fetchRepositories()
    }
  }

  /* componentWillReceiveProps (nextProps) {
    const user = this.props.routeParams.user
    const nextUser = nextProps.routeParams
    if (user.login !== nextUser.login) {
      this.props.fetchCourses(nextDept);
    }
  } */

  render () {
    const { user, angularRepos } = this.props
    const userDetailsComponent = user ? <UserDetails user={user} angularRepos={angularRepos} /> : 'Loading...'
    return (
      <div>
        {userDetailsComponent}
      </div>
    )
  }
}
