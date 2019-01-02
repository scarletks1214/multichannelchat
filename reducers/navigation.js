import {
  SET_NAVIGATION,
  REFRESH_NAVIGATION_WITH_WORKSPACE,
  REFRESH_NAVIGATION_WITH_WORKSPACES,
  LOGOUT
} from '../actionTypes'

import { NAVS, APP_TYPE } from '../config'

function refreshNavigationBarWithWorkspace(originalNavigation, workspace) {
  let navigation = [...originalNavigation]
  for (var i = 0; i < navigation.length; i++) {
    let subNav = navigation[i]
    for (var k = 0; k < subNav.items.length; k++) {
      let navLeaf = subNav.items[k]
      if (navLeaf.static) continue
      if (navLeaf.slug) {
        if (navLeaf.slug === 'workspace') {
          navLeaf.title = workspace.name
          navLeaf.addtionalClass = ' active-workspace-menu'
        } else {
          navLeaf.items = []
          let items = []
          if (workspace[navLeaf.slug]) {
            let keys = Object.keys(workspace[navLeaf.slug])
            items = keys.map(key => {
              let navItem = workspace[navLeaf.slug][key]
              let item = {
                url: `/${navLeaf.slug}/${key.toLowerCase()}`,
                icon: '',
                title: navItem.name,
                parents: [navLeaf.slug],
                items: [],
                addtionalClass: ' submenu'
              }
              // if (navItem.entities && navItem.entities.length > 0) {
              //   item.items = navItem.entities.map(entity => {
              //     return {
              //       url: `/${
              //         navLeaf.slug
              //       }/${key.toLowerCase()}/entities/${entity.toLowerCase()}`,
              //       icon: '',
              //       title: entity,
              //       parents: [navLeaf.slug, key.toLowerCase()],
              //       items: [],
              //       addtionalClass: ' submenu2'
              //     }
              //   })
              // }
              return item
            })
          }

          items.push({
            url: `/${navLeaf.slug}`,
            icon: '',
            parents: [navLeaf.slug],
            title: 'View All',
            items: [],
            addtionalClass: ' submenu'
          })
          navLeaf.items = items
        }
      }
    }
  }
  return navigation
}

function refreshNavigationBarWithWorkspaces(originalNavigation, workspaces) {
  let navigation = [...originalNavigation]
  let worksapceTemp = workspaces.slice(0, 4)
  for (var i = 0; i < navigation.length; i++) {
    let subNav = navigation[i]
    for (var k = 0; k < subNav.items.length; k++) {
      let navLeaf = subNav.items[k]
      if (navLeaf.static) continue
      if (navLeaf.slug) {
        if (navLeaf.slug === 'workspace') {
          navLeaf.items = []
          let items = worksapceTemp.map(workspace => {
            // let navItem = workspace[navLeaf.slug][key]
            let item = {
              workspaceId: workspace.id,
              workspaceType: workspace.type,
              icon: '',
              title: workspace.name,
              parents: [navLeaf.slug],
              items: [],
              addtionalClass: ' submenu'
            }
            return item
          })

          items.push({
            url: `/${navLeaf.slug}s`,
            icon: '',
            parents: [navLeaf.slug],
            title: 'View All',
            items: [],
            addtionalClass: ' submenu'
          })
          navLeaf.items = items
        }
      }
    }
  }
  return navigation
}
export function navigation(state = Array.from(NAVS[APP_TYPE]), action) {
  switch (action.type) {
    case SET_NAVIGATION:
      return Array.from(action.navigation)
    case REFRESH_NAVIGATION_WITH_WORKSPACE:
      return refreshNavigationBarWithWorkspace(state, action.workspace)
    case REFRESH_NAVIGATION_WITH_WORKSPACES:
      return refreshNavigationBarWithWorkspaces(state, action.workspaces)
    case LOGOUT:
      return Array.from(NAVS[APP_TYPE])
    default:
      return state
  }
}
