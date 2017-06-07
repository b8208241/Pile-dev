import {
  LOG_SUBMIT,
  PILE_SUBMIT,
  UPDATE_PILE_ISSUEARR,
  SENDING_REQUEST,
  CLEAR_ERROR,
  REQUEST_ERROR
} from './constants.js'

export function pileSubmit(pileobj){
  return{type: PILE_SUBMIT, pileobj}
}

export function _updatePile_issueArr(pileobj, issueName){
  return {type: UPDATE_PILE_ISSUEARR, pileobj, issueName}
}

export function LogSubmit(logDraftData, topicId, userName){
  return{type: LOG_SUBMIT, logDraftData, topicId, userName}
}

export function requestError (error) {
  return {type: REQUEST_ERROR, error}
}

/**
 * Sets the `error` state as empty
 */
export function clearError () {
  return {type: CLEAR_ERROR}
}

/**
 * Sets the `currentlySending` state, which displays a loading indicator during requests
 */
export function sendingRequest (sending) {
  return {type: SENDING_REQUEST, sending}
}
