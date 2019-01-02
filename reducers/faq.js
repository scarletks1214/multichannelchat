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
  FAQ_QUESTION_DELETE_ERROR,
  WORKSPACES_AUTO_LOAD_REQUEST
} from '../actionTypes'

const initialState = {
  products: [],
  faqs: [],
  isLoading: false,
  isLoaded: false
}

function updateFaqs(currentFaqs, newFaqs, newFaqIds) {
  let existingIds = []
  let faqs = currentFaqs.map(faq => {
    let ind = newFaqIds.indexOf(faq.id)
    if (ind > -1) {
      existingIds.push(faq.id)
      return newFaqs[ind]
    }
    return faq
  })
  return [...newFaqs.filter(faq => !existingIds.includes(faq.id)), ...faqs]
}

export const faq = (state = initialState, { type, products, faqs, ...action }) => {
  switch (type) {
    case WORKSPACES_AUTO_LOAD_REQUEST:
      return initialState
    case FAQ_LOAD_REQUESTED:
      return Object.assign({}, state, { isLoading: true })
    case FAQ_LOAD_SUCCEDED:
      return Object.assign({}, state, {
        products,
        faqs,
        isLoading: false,
        isLoaded: true
      })
    case FAQ_LOAD_ERROR:
      return Object.assign({}, state, {
        products: [],
        faqs: [],
        isLoading: false
      })
    case FAQ_PRODUCT_UPDATE_REQUESTED:
      return Object.assign({}, state, { isLoading: true })
    case FAQ_PRODUCT_UPDATE_SUCCEDED:
      return Object.assign({}, state, { products, isLoading: false })
    case FAQ_PRODUCT_UPDATE_ERROR:
      return Object.assign({}, state, { isLoading: false })
    case FAQ_QUESTION_UPDATE_REQUESTED:
      return Object.assign({}, state, { isLoading: true })
    case FAQ_QUESTION_UPDATE_SUCCEDED:
      return Object.assign({}, state, { faqs: updateFaqs(state.faqs, faqs, action.faqIds), isLoading: false })
    case FAQ_QUESTION_UPDATE_ERROR:
      return Object.assign({}, state, { isLoading: false })
    case FAQ_QUESTION_DELETE_REQUESTED:
      return Object.assign({}, state, { isLoading: true })
    case FAQ_QUESTION_DELETE_SUCCEDED:
      return Object.assign({}, state, { faqs: state.faqs.filter(faq => faq.id !== action.faqId), isLoading: false })
    case FAQ_QUESTION_DELETE_ERROR:
      return Object.assign({}, state, { isLoading: false })
    default:
      return state
  }
}
