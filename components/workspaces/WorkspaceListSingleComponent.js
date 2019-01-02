import React, { Component } from 'react'
import { IconTrash, IconPencil } from '../../assets/icons'
import { PROJECT_TYPE_MAP } from '../../config/info'
import * as Icons from '../../assets/icons/index'

class WorkspaceListSingleComponent extends Component {
  handleEditPencil(event) {
    event.preventDefault()
    event.stopPropagation()
  }
  handleRemove(event) {
    event.preventDefault()
    event.stopPropagation()
    this.props.handleRemove(this.props.workspace)
  }
  render() {
    const { workspace } = this.props
    const ProjectTypeIcon =
      PROJECT_TYPE_MAP[this.props.workspace.type] &&
      Icons[PROJECT_TYPE_MAP[this.props.workspace.type].icon]

    return (
      <div
        className="workspace-component mb-3"
        onClick={() => this.props.onClick(workspace)}>
        <div className="left-part">
          {ProjectTypeIcon ? (
            <ProjectTypeIcon className="workspace-logo logo-icon" />
          ) : (
            <div className="workspace-logo blank-circle" />
          )}
        </div>
        <div className="center-part">
          <span className="workspace-name">{workspace.name}</span>
          <span className="workspace-info">{workspace.country}</span>
        </div>
        <div className="buttons-part">
          <div onClick={this.handleEditPencil.bind(this)}>
            <IconPencil className="icon-pencil" alt="" fillColor="#ff00ff" />
          </div>
          <div onClick={this.handleRemove.bind(this)}>
            <IconTrash className="icon-edit" />
          </div>
        </div>
      </div>
    )
  }
}

export default WorkspaceListSingleComponent
