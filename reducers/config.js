import { isDoc } from '../utils'
export function config(
  state = {
    layout: isDoc() ? 'top-navigation' : 'default-sidebar',
    background: 'light',
    navbar: 'light',
    topNavigation: 'light',
    logo: 'light',
    leftSidebar: 'dark',
    leftSidebarIcons: 'light',
    rightSidebar: false,
    collapsed: false
  },
  action
) {
  switch (action.type) {
    case 'SET_CONFIG':
      return Object.assign({}, state, {
        ...action.config
      })
    default:
      return state
  }
}
