import { addNotification as notify } from 'reapop'

import {
  FAQ_LOAD_REQUESTED,
  FAQ_LOAD_SUCCEDED,
  FAQ_LOAD_ERROR,
  FAQ_PRODUCT_UPDATE_REQUESTED,
  FAQ_PRODUCT_UPDATE_SUCCEDED,
  FAQ_PRODUCT_UPDATE_ERROR,
  FAQ_QUESTION_UPDATE_REQUESTED,
  FAQ_QUESTION_UPDATE_SUCCEDED,
  FAQ_QUESTION_UPDATE_ERROR,
  FAQ_QUESTION_DELETE_REQUESTED,
  FAQ_QUESTION_DELETE_SUCCEDED,
  FAQ_QUESTION_DELETE_ERROR
} from '../actionTypes'
import {
  loadFaqs as loadFaqsApi,
  updateFaqProducts as updateFaqProductsApi,
  updateFaqQuestions as updateFaqQuestionsApi,
  deleteFaqQuestion as deleteFaqQuestionApi
} from '../utils/ApiManager'
import { unCompressJson } from '../utils/Converters'

export const loadFaqs = workspaceId => async dispatch => {
  try {
    dispatch({ type: FAQ_LOAD_REQUESTED })
    const res = await loadFaqsApi(workspaceId)
    if (res.success) {
      dispatch({
        type: FAQ_LOAD_SUCCEDED,
        faqs:
          typeof res.response.faqs === 'string'
            ? unCompressJson(res.response.faqs)
            : [],
        products: res.response.products
      })
    } else {
      dispatch({ type: FAQ_LOAD_ERROR })
      dispatch(
        notify({
          title: `Error`,
          message: res.statusMsg,
          status: 'error',
          position: 'tr',
          dismissible: true
        })
      )
    }
    return res
  } catch (err) {
    console.log(err)
    dispatch({ type: FAQ_LOAD_ERROR })
  }
}

export const updateFaqProducts = (workspaceId, products) => async dispatch => {
  try {
    dispatch({ type: FAQ_PRODUCT_UPDATE_REQUESTED })
    const res = await updateFaqProductsApi(workspaceId, { products })
    if (res.success) {
      dispatch({
        type: FAQ_PRODUCT_UPDATE_SUCCEDED,
        products
      })
    } else {
      dispatch({ type: FAQ_PRODUCT_UPDATE_ERROR })
    }
    return res
  } catch (err) {
    console.log(err)
    dispatch({ type: FAQ_PRODUCT_UPDATE_ERROR })
  }
}

export const updateFaqQuestions = (
  workspaceId,
  faqs,
) => async dispatch => {
  try {
    dispatch({ type: FAQ_QUESTION_UPDATE_REQUESTED })
    const res = await updateFaqQuestionsApi(workspaceId, faqs)
    if (res.success) {
      let faqIds = res.response.faqs.map((faq, index) => {
        faqs[index].id = faq.id
        return faq.id
      })
      dispatch({
        type: FAQ_QUESTION_UPDATE_SUCCEDED,
        faqs: faqs,
        faqIds: faqIds,
      })
    } else {
      dispatch({ type: FAQ_QUESTION_UPDATE_ERROR })
    }
    return res
  } catch (err) {
    dispatch({ type: FAQ_QUESTION_UPDATE_ERROR })
  }
}
// export const updateFaqQuestions = (
//   workspaceId,
//   faqs,
//   otherFaqs
// ) => async dispatch => {
//   try {
//     dispatch({ type: FAQ_QUESTION_UPDATE_REQUESTED })
//     const res = await updateFaqQuestionsApi(workspaceId, faqs)
//     if (res.success) {
//       dispatch({
//         type: FAQ_QUESTION_UPDATE_SUCCEDED,
//         faqs: [...faqs, ...otherFaqs]
//       })
//       dispatch(
//         notify({
//           title: `Success`,
//           message: `Successfully saved question`,
//           status: 200,
//           position: 'tr',
//           dismissible: true
//         })
//       )
//     } else {
//       dispatch(
//         notify({
//           title: `Error`,
//           message: `Failed to save questions`,
//           status: 400,
//           position: 'tr',
//           dismissible: true
//         })
//       )
//       dispatch({ type: FAQ_QUESTION_UPDATE_ERROR })
//     }
//     return res
//   } catch (err) {
//     dispatch(
//       notify({
//         title: `Error`,
//         message: err,
//         status: 400,
//         position: 'tr',
//         dismissible: true
//       })
//     )
//     dispatch({ type: FAQ_QUESTION_UPDATE_ERROR })
//   }
// }

export const deleteFaqQuestion = (
  workspaceId,
  faqId,
) => async dispatch => {
  dispatch({ type: FAQ_QUESTION_DELETE_REQUESTED })
  const res = await deleteFaqQuestionApi(workspaceId, faqId)
  if (res.success) {
    dispatch({ type: FAQ_QUESTION_DELETE_SUCCEDED, faqId: faqId })
  } else {
    dispatch({ type: FAQ_QUESTION_DELETE_ERROR })
  }
  return res
}
