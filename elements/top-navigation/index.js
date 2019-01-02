import { connect } from 'react-redux'
import { compose, branch, renderComponent, renderNothing } from 'recompose'
import TopNavigation from './TopNavigation'

const layouts = ['top-navigation']

const Component = compose(
  connect(state => {
    return {
      navigation: state.navigation,
      layout: state.config.layout
    }
  }),
  branch(
    ({ layout }) => layouts.includes(layout),
    renderComponent(TopNavigation),
    renderNothing
  )
)(TopNavigation)

export default Component
