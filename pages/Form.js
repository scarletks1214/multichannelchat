import React from 'react'

const Form = ({ title, description, children }) => (
  <div className="sample-form">
    {title && <h3>{title}</h3>}
    <form onSubmit={e => e.preventDefault()}>
      <div className="description">{description}</div>
      {children}
    </form>
  </div>
)

export default Form
