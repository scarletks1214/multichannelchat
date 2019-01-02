import React from 'react'
import { IconMenuCollapse, IconMenuExpand } from '../../assets/icons/index'

const SidebarFooter = ({ collapsed, onClickCollapseExpand }) => (
  <div className="sidebar-footer">
    <div className="info">
      <span>TERMS OF USE · Copyright ©2018</span>
      <span>ACTIVE.AI MORFEUS WORKFLOW</span>
    </div>
    {collapsed ? (
      <IconMenuExpand className="fill-white" onClick={onClickCollapseExpand} />
    ) : (
      <IconMenuCollapse
        className="fill-white"
        onClick={onClickCollapseExpand}
      />
    )}
  </div>
)
export default SidebarFooter
