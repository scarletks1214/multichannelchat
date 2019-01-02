import { APP_TYPE } from '../config/constants'

export const isAdmin = () => APP_TYPE === 'admin'
export const isDoc = () => APP_TYPE === 'doc'
export const isFront = () => APP_TYPE === 'front'

export function showErrorNotification(notify, message, title = 'Error') {
  notify({
    title: title,
    message: message,
    status: 'error',
    position: 'tr',
    dismissible: true
  })
}

export function showSuccessNotification(notify, message, title = 'Success') {
  notify({
    title: title,
    message: message,
    status: 'success',
    position: 'tr',
    dismissible: true
  })
}
