import {
  SET_NAVIGATION,
  REFRESH_NAVIGATION_WITH_WORKSPACES
} from '../actionTypes'
// import navbarInfo from '../json/navbar.json'

// export const setSideBarNavigation = originalNavigation => async dispatch => {
//   let navigation = [...originalNavigation]
//   for (var i = 0; i < navigation.length; i++) {
//     let subNav = navigation[i]
//     for (var k = 0; k < subNav.items.length; k++) {
//       let navLeaf = subNav.items[k]
//       if (navLeaf.static) continue
//       navLeaf.items = []
//       let items = []
//       if (navLeaf.slug) {
//         if (navbarInfo.classifier[navLeaf.slug]) {
//           let keys = Object.keys(navbarInfo.classifier[navLeaf.slug])
//           items = keys.map(key => {
//             let navItem = navbarInfo.classifier[navLeaf.slug][key]
//             let item = {
//               url: `/${navLeaf.slug}/${key.toLowerCase()}`,
//               icon: '',
//               title: key,
//               parents: [navLeaf.slug],
//               items: [],
//               addtionalClass: ' submenu'
//             }
//             if (navItem.entities && navItem.entities.length > 0) {
//               item.items = navItem.entities.map(entity => {
//                 return {
//                   url: `/${
//                     navLeaf.slug
//                   }/${key.toLowerCase()}/entities/${entity.toLowerCase()}`,
//                   icon: '',
//                   title: entity,
//                   parents: [navLeaf.slug, key.toLowerCase()],
//                   items: [],
//                   addtionalClass: ' submenu2'
//                 }
//               })
//             }
//             return item
//           })
//         }
//         items.push({
//           url: `/${navLeaf.slug}/all`,
//           icon: '',
//           parents: [navLeaf.slug],
//           title: 'View All',
//           items: [],
//           addtionalClass: ' submenu'
//         })
//         navLeaf.items = items
//       }
//     }
//   }
//   dispatch({ type: SET_NAVIGATION, navigation: navigation })
//   return null
// }

// export const setSideBarFromWorkspace = (originalNavigation, workspace) => async dispatch => {
//   let navigation = [...originalNavigation]
//   for (var i = 0; i < navigation.length; i++) {
//     let subNav = navigation[i]
//     for (var k = 0; k < subNav.items.length; k++) {
//       let navLeaf = subNav.items[k]
//       if (navLeaf.static) continue
//       navLeaf.items = []
//       let items = []
//       if (navLeaf.slug) {
//         if (navLeaf.slug === "workspace") {
//           navLeaf.title = workspace.name;
//         } else {
//           if (workspace[navLeaf.slug]) {
//             let keys = Object.keys(workspace[navLeaf.slug])
//             items = keys.map(key => {
//               let navItem = workspace[navLeaf.slug][key]
//               let item = {
//                 url: `/${navLeaf.slug}/${key.toLowerCase()}`,
//                 icon: '',
//                 title: key,
//                 parents: [navLeaf.slug],
//                 items: [],
//                 addtionalClass: ' submenu'
//               }
//               if (navItem.entities && navItem.entities.length > 0) {
//                 item.items = navItem.entities.map(entity => {
//                   return {
//                     url: `/${
//                       navLeaf.slug
//                     }/${key.toLowerCase()}/entities/${entity.toLowerCase()}`,
//                     icon: '',
//                     title: entity,
//                     parents: [navLeaf.slug, key.toLowerCase()],
//                     items: [],
//                     addtionalClass: ' submenu2'
//                   }
//                 })
//               }
//               return item
//             })
//           }
//         }

//         items.push({
//           url: `/${navLeaf.slug}/all`,
//           icon: '',
//           parents: [navLeaf.slug],
//           title: 'View All',
//           items: [],
//           addtionalClass: ' submenu'
//         })
//         navLeaf.items = items
//       }
//     }
//   }
//   dispatch({ type: SET_NAVIGATION, navigation: navigation })
//   return null
// }
export const toggleNavigation = (
  originalNavigation,
  currentNavItem,
  shouldOpen
) => async dispatch => {
  let navigation = [...originalNavigation]
  for (var i = 0; i < navigation.length; i++) {
    let subNav = navigation[i]
    for (var k = 0; k < subNav.items.length; k++) {
      let navLeaf = subNav.items[k]
      if (!currentNavItem.parents || currentNavItem.parents.length === 0) {
        if (currentNavItem.isOpen && currentNavItem.items.length > 0) {
          navLeaf.isOpen = false
        } else {
          if (currentNavItem.slug) {
            navLeaf.isOpen = navLeaf.slug === currentNavItem.slug
          } else {
            navLeaf.isOpen = navLeaf.url === currentNavItem.url
          }
        }
      } else {
        navLeaf.isOpen = navLeaf.slug === currentNavItem.parents[0]
        for (var p = 0; p < navLeaf.items.length; p++) {
          let navItem = navLeaf.items[p]
          if (currentNavItem.parents.length === 1) {
            if (currentNavItem.isOpen) {
              navItem.isOpen = false
            } else {
              navItem.isOpen =
                navLeaf.isOpen &&
                navItem.title.toLowerCase() ===
                  currentNavItem.title.toLowerCase()
            }
          } else {
            navItem.isOpen =
              navLeaf.isOpen &&
              navItem.title.toLowerCase() === currentNavItem.parents[1]
          }
          for (var q = 0; q < navItem.items.length; q++) {
            let navItem1 = navItem.items[q]
            navItem1.isOpen =
              navItem.isOpen &&
              navItem1.title.toLowerCase() ===
                currentNavItem.title.toLowerCase()
          }
        }
      }
    }
  }
  dispatch({ type: SET_NAVIGATION, navigation: navigation })
  return null
}

export const updateNavBarWithWorkspaces = workspaces => async dispatch => {
  dispatch({
    type: REFRESH_NAVIGATION_WITH_WORKSPACES,
    workspaces: workspaces || []
  })
  return null
}
