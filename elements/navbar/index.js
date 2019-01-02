import { connect } from 'react-redux'
import { compose, branch, renderComponent, renderNothing } from 'recompose'
import Navbar from './Navbar'

const layouts = ['default-sidebar', 'collapsed-sidebar-1', 'top-navigation']

const Component = compose(
  connect(state => {
    return {
      navigation: state.navigation,
      currentUser: state.auth.user,
      layout: state.config.layout
    }
  }),
  branch(
    ({ layout }) => layouts.includes(layout),
    renderComponent(Navbar),
    renderNothing
  )
)(Navbar)

export default Component
