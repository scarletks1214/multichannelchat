import React, { Component } from 'react'
import { PROJECT_TYPE_MAP } from '../../config/info'
import * as Icons from '../../assets/icons/index'

class ProjectTypeCompnent extends Component {
  render() {
    const ProjectTypeIcon =
      Icons[PROJECT_TYPE_MAP[this.props.projectType.value].icon]
    return (
      <div
        className={
          'project-type-component ' +
          (this.props.isSelected ? 'selected ' : '') +
          this.props.className
        }
        onClick={this.props.onClick}>
        <div className="content">
          <ProjectTypeIcon className="project-logo" />
          <span className="title">{this.props.projectType.label}</span>
        </div>
      </div>
    )
  }
}

export default ProjectTypeCompnent
