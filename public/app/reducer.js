import {combineReducers} from 'redux';
import update from 'immutability-helper';
import {
  POST_PILE,
  PATCH_TAGS
} from './reduxsaga/constants.js'

function allepiles (state={}, action) {
  switch (action.type) {
    case POST_PILE:
      console.log('reducer allepiles, POST_PILE');
      return update(state, {
        $merge: action.pilePosted
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
  tags,
  status,
  others
})
