import {combineReducers} from 'redux';
import update from 'immutability-helper';
import {
  POST_PILE,
  PATCH_PILE_ISSUEARR,
  PATCH_ISSUES,
  PATCH_ISSUES_UPDATE,
  PATCH_TAGS,
  PATCH_TYPES
} from './reduxsaga/constants.js'

function allepiles (state={}, action) {
  switch (action.type) {
    case POST_PILE:
      console.log('reducer allepiles, POST_PILE');
      return update(state, {
        $merge: action.pilePosted
      })
      break;
    case PATCH_PILE_ISSUEARR:
      console.log('reducer allepiles, PATCH_PILE_ISSUEARR');
      return update(state, {
        [action.pileId]: {
          "issueArr": {$set: action.patchedPileIssueArr}
        }
      })
      break;
    default:
      return state
  }
}

function issues(state={}, action) {
  switch (action.type) {
    case PATCH_ISSUES:
      console.log('reducer issues, PATCH_ISSUES')
      return update(state, {
        $apply: function(obj){
          action.existedIssues.forEach(
            function(issueName, index, arr){
              obj[issueName].include.push(action.pileId)
            }
          );
          return obj;
        },
        $merge: action.newIssues
      })
      break;
    case PATCH_ISSUES_UPDATE:
      console.log('reducer issues, PATCH_ISSUES_UPDATE')
      return update(state, {
        [action.addedIssue]: {
          "include": {
            $push: [action.pileId]
          }
        }
      })
      break;
    default:
      return state
  }
}

function types (state={"web":[], "image": [], "text": [], "file-pdf": [], "ohne": []}, action) {
  switch (action.type) {
    case PATCH_TYPES:
      console.log('reducer types, PATCH_TYPES')
      return update(state, {
        [action.contentType]: {
          $unshift: [action.pileId]
        }
      })
      break;
    default:
      return state
  }
}

function tags (state={}, action) {
  switch (action.type) {
    case PATCH_TAGS:
      console.log('reducer tags, PATCH_TAGS')
      return update(state, {
        $apply: function(obj){
          action.existedTags.forEach(
            function(tagName, index, arr){
              obj[tagName].include.push(action.pileId)
            }
          );
          return obj;
        },
        $merge: action.newTags
      })
      break;
    default:
      return state
  }
}

function status (state={}, action) {
  switch (action.type) {

    default:
      return state
  }
}

function others (state={}, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  allepiles,
  issues,
  types,
  tags,
  status,
  others
})
