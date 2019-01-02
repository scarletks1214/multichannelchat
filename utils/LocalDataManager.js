export const setUnsavedIntent = (workspaceId, intentId, intent) => {
  try {
    localStorage.setItem(`intent-${workspaceId}-${intentId}`, intent)
    return true
  } catch (err) {
    console.log('Save to local Storage Failed', err)
  }
  return false
}
export const getUnsavedIntent = (workspaceId, intentId) => {
  return localStorage.getItem(`intent-${workspaceId}-${intentId}`)
}
export const clearUnsavedIntent = (workspaceId, intentId) => {
  return localStorage.removeItem(`intent-${workspaceId}-${intentId}`)
}
export const checkUnsavedIntent = (workspaceId, intentId) => {
  return !!localStorage.getItem(`intent-${workspaceId}-${intentId}`)
}
