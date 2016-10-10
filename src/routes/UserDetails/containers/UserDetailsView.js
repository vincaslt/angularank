import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPeople, fetchRepositories } from '../../../modules/github'
import { getUserWithRepos, getUserAngularRepositories } from '../module/selectors'
import { fetchUserRepositories } from '../module/userRepos'

import { default as UserDetails } from '../components/UserDetailsView'

const mapStateToProps = (state, props) => ({
  user: getUserWithRepos(state, props),
  people: state.github.people,
  angularRepos: getUserAngularRepositories(state, props),
  usersRepos: state.usersRepos
})

const mapDispatchToProps = {
  fetchPeople,
  fetchRepositories,
  fetchUserRepositories
}

@connect(mapStateToProps, mapDispatchToProps)
export default class UserDetailsView extends Component {
  static propTypes = {
    angularRepos: PropTypes.array.isRequired,
    people: PropTypes.array.isRequired,
    fetchPeople: PropTypes.func.isRequired,
    fetchRepositories: PropTypes.func.isRequired,
    fetchUserRepositories: PropTypes.func.isRequired,
    routeParams: PropTypes.object.isRequired,
    usersRepos: PropTypes.object.isRequired,
    user: PropTypes.object
  }

  componentWillMount () {
    const {
      people,
      fetchPeople,
      angularRepos,
      fetchRepositories,
      fetchUserRepositories,
      usersRepos
    } = this.props

    if (!people || people.length === 0) {
      fetchPeople()
    }

    if (!angularRepos || angularRepos.length === 0) {
      fetchRepositories()
    }

    if (!usersRepos || Object.values(usersRepos).length === 0) {
      fetchUserRepositories(this.props.routeParams.user)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { routeParams, user } = this.props
    if (
      !user.userRepos &&
      routeParams.user !== nextProps.routeParams.user
    ) {
      fetchUserRepositories(routeParams.user)
    }
  }

  render () {
    const { user, angularRepos } = this.props
    const userDetailsComponent = (user && angularRepos) ? (
      <UserDetails user={user} angularRepos={angularRepos} />
    ) : 'Loading...'

    return (
      <div>
        {userDetailsComponent}
      </div>
    )
  }
}
