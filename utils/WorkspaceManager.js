export const setWorkspace = workspaceId => {
  localStorage.setItem('workspace', workspaceId)
}

export const clearWorkspace = () => {
  localStorage.removeItem('workspace')
}

export const isWorkspaceSet = () => {
  const workspaceId = localStorage.getItem('workspace')
  return !!workspaceId
}

export const getWorkspaceId = () => localStorage.getItem('workspace')
