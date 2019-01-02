import axios from 'axios'

import { API_BASE_URL, USE_WORKSPACE_SERVER } from '../config/constants'
import { getAccessToken } from './AuthManager'

async function sendGetRequest(relativeUrl) {
  const url = `${API_BASE_URL}${relativeUrl}`
  const response = await axios({
    method: 'GET',
    url,
    headers: { 'X-CSRF-Token': getAccessToken() },
    withCredentials: true
  })
  return response
}

async function sendPostRequest(relativeUrl, formData, withCSRF = true) {
  const url = `${API_BASE_URL}${relativeUrl}`
  const headers = {}
  if (withCSRF) {
    headers['X-CSRF-Token'] = getAccessToken()
  }
  const response = await axios({
    method: 'POST',
    url,
    withCredentials: true,
    headers: headers,
    data: formData
  })
  return response
}

async function sendDeleteRequest(relativeUrl) {
  const url = `${API_BASE_URL}${relativeUrl}`

  const response = await axios({
    method: 'DELETE',
    url,
    headers: { 'X-CSRF-Token': getAccessToken() },
    withCredentials: true
  })
  return response
}

async function sendPutRequest(relativeUrl, formData) {
  const url = `${API_BASE_URL}${relativeUrl}`

  const response = await axios({
    method: 'PUT',
    url,
    data: formData,
    headers: { 'X-CSRF-Token': getAccessToken() },
    withCredentials: true
  })
  return response
}

export async function signup({
  firstName,
  lastName,
  phoneNo,
  emailId,
  password,
  captchaToken
}) {
  const url = `/api/signup`
  let formData = {}
  formData.firstName = firstName
  formData.lastName = lastName
  formData.phoneNo = phoneNo
  formData.captchaToken = captchaToken
  formData.emailId = emailId
  formData.password = password

  const { data } = await sendPostRequest(url, formData, false)
  return data
}

export async function verifyEmailWithToken(verifyToken) {
  const url = `/api/verify/${verifyToken}`
  let formData = {}
  const { data } = await sendPostRequest(url, formData, false)
  return data
}

export async function login({ emailId, password }) {
  const url = `/api/login`

  let formData = {}
  formData.emailId = emailId
  formData.password = password

  const response = await sendPostRequest(url, formData, false)
  return response
}

export async function logout() {
  const url = `/api/logout`
  const { data } = await sendPostRequest(url, null)
  return data
}

export async function getProfile() {
  const url = `/api/user/me`
  const { data } = await sendGetRequest(url)
  return data
}

export async function updateProfile(user) {
  const url = `/api/user/me`
  const { data } = await sendPutRequest(url, user)
  return data
}

export async function updatePassword(oldPassword, newPassword) {
  const url = `/api/update-password`
  const { data } = await sendPostRequest(url, { newPassword, oldPassword })
  return data
}

export async function createWorkspace(workspace) {
  const url = `/api/workspaces`
  const { data } = await sendPostRequest(url, workspace)
  return data
}

export async function deleteWorkspace(workspaceId) {
  const url = `/api/workspaces/${workspaceId}`
  const { data } = await sendDeleteRequest(url)
  return data
}

export async function loadWorkspace(workspaceId) {
  const url = `/api/workspaces/${workspaceId}`
  const { data } = await sendGetRequest(url)
  return data
}

export async function loadWorkspaces() {
  const url = `/api/workspaces`
  const { data } = await sendGetRequest(url)
  return data
}
/** Deploys **/
export async function deployWorkspace(workspaceId) {
  const url = `/api/workspaces/${workspaceId}/deploy`
  const { data } = await sendPostRequest(url)
  return data
}

export async function loadDeploys(workspaceId) {
  const url = `/api/workspaces/${workspaceId}/deploys`
  const { data } = await sendGetRequest(url)
  return data
}

export async function cancelDeploy(deployId) {
  const url = `/api/deploys/${deployId}/cancel`
  const { data } = await sendPostRequest(url)
  return data
}

/** Intents **/
export async function createIntent(workspaceId, intent) {
  const url = `/api/workspaces/${workspaceId}/intents`
  const { data } = await sendPostRequest(url, intent)
  return data
}
export async function loadIntent(workspaceId, intentId) {
  const url = `/api/workspaces/${workspaceId}/intents/${intentId}`
  const { data } = await sendGetRequest(url)
  return data
}
export async function updateIntent(workspaceId, intentId, intent) {
  const url = `/api/workspaces/${workspaceId}/intents/${intentId}`
  const { data } = await sendPutRequest(url, intent)
  return data
}
export async function deleteIntent(workspaceId, intentId) {
  const url = `/api/workspaces/${workspaceId}/intents/${intentId}`
  const { data } = await sendDeleteRequest(url)
  return data
}

/** Entities **/

export async function loadEntities(workspaceId) {
  const url = `/api/workspaces/${workspaceId}/entities`
  const { data } = await sendGetRequest(url)
  return data
}

export async function addEntities(workspaceId, entities) {
  const url = `/api/workspaces/${workspaceId}/entities`
  const { data } = await sendPostRequest(url, entities)
  return data
}

export async function loadFaqs(workspaceId) {
  const url = `/api/workspaces/${workspaceId}/faqs`
  const { data } = await sendGetRequest(url)
  return data
}

export async function updateFaqProducts(workspaceId, products) {
  const url = `/api/workspaces/${workspaceId}/products`
  const { data } = await sendPostRequest(url, products)
  return data
}

export async function updateFaqQuestions(workspaceId, faqs) {
  const url = `/api/workspaces/${workspaceId}/faqs`
  const { data } = await sendPostRequest(url, { faqs })
  return data
}

export async function deleteFaqQuestion(workspaceId, faqId) {
  const url = `/api/workspaces/${workspaceId}/faqs/${faqId}`
  const { data } = await sendDeleteRequest(url)
  return data
}

export async function loadSmallTalks(workspaceId) {
  const url = `/api/workspaces/${workspaceId}/smalltalks`
  const { data } = await sendGetRequest(url)
  return data
}

export async function updateSmallTalksCategory(workspaceId, categories) {
  const url = `/api/workspaces/${workspaceId}/categories`
  const { data } = await sendPostRequest(url, { categories })
  return data
}

export async function updateSmallTalks(workspaceId, smallTalks) {
  const url = `/api/workspaces/${workspaceId}/smalltalks`
  const { data } = await sendPostRequest(url, { smallTalks })
  return data
}

export async function deleteSmallTalk(workspaceId, smalTalkId) {
  const url = `/api/workspaces/${workspaceId}/smalltalks/${smalTalkId}`
  const { data } = await sendDeleteRequest(url)
  return data
}

/** Channels **/

export async function loadChannels(workspaceId) {
  const url = `/api/workspaces/${workspaceId}/channels`
  const { data } = await sendGetRequest(url)
  return data
}

export async function updateChannel(workspaceId, channel, channelData) {
  const url = `/api/workspaces/${workspaceId}/channels/${channel}`
  const { data } = await sendPutRequest(url, channelData)
  return data
}

export async function queryTestbots(workspace, input) {
  let url // = `/api/workspaces/${workspaceId}/entities`
  let headers
  if (USE_WORKSPACE_SERVER) {
    url = `${workspace.url}`
    headers = {}
  } else {
    url = `https://staging-api.triniti.ai/v2/all/process?domain=TrinitiTrainer&version=3`
    headers = {
      'X-Api-Key': 'ae1f1197e8b96074cfe8f7095f7c053a',
      apikey: '1',
      userid: '1'
    }
  }

  const formData = {
    input,
    prompt: '',
    sessionhistory: [],
    currentintent: '',
    expectedentities: [],
    mode: '',
    transactionFlag: false,
    contextedEntities: null
  }

  const { data } = await axios({
    method: 'POST',
    url,
    headers: headers,
    data: formData
  })
  return data
}

export async function queryWithFlowTestbots(workspace, input) {
  let url // = `/api/workspaces/${workspaceId}/entities`
  let headers
  if (USE_WORKSPACE_SERVER) {
    url = `${workspace.url}`
    headers = {}
  } else {
    url = `https://axis-sit.active.ai/morfeus/v1/channels/162w01623152020/authMessage`
    headers = {
      'Content-Type': 'application/json'
    }
  }
  const formData = {
    sdkVersion: '1.0.0',
    sdkType: 'W',
    messageId: 'mid.n8pu2n2b',
    messageType: 'auto',
    messageContent: input
  }

  const { data } = await axios({
    method: 'POST',
    url,
    headers: headers,
    data: formData
  })
  return data
}
export function handleResponseError(response, defaultErrorMessage, notify, t) {
  let errorMessage = defaultErrorMessage
  if (response.message) {
    errorMessage = response.message
  } else if (response.msg) {
    errorMessage = response.msg
  } else if (response.statusMsg) {
    errorMessage = response.statusMsg
  }
  if (notify) {
    notify({
      title: `Error`,
      message: errorMessage,
      status: 'error',
      position: 'tr',
      dismissible: true
    })
  }
  return errorMessage
}
