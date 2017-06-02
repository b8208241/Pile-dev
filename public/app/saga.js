//Important!! "babel-polyfill" is for es6 technique
//It's mean "generator" (* & yield) in this file
import 'babel-polyfill'
import {take, call, put, fork, race, select} from 'redux-saga/effects'
import update from 'immutability-helper';
import {
  PILE_SUBMIT,
  POST_PILE,
  PATCH_ISSUES,
  PATCH_TAGS,
  PATCH_TYPES
} from './reduxsaga/constants.js'
import {
  createObject
} from './reduxsaga/tools.js'

export function * pileSubmit (){
  while (true) {
    const data = yield take(PILE_SUBMIT);
    console.log('saga, pileSubmit start');

    let pilePosted = new Object();
    pilePosted[data.pileobj.id] = data.pileobj;

    let contentType = data.pileobj.contentType ? data.pileobj.contentType : "ohne";
    yield put({
      type: PATCH_TYPES,
      pileId: data.pileobj.id,
      contentType: contentType
    })

    yield put({
      type: POST_PILE,
      pilePosted: pilePosted
    })

    if(data.pileobj.issueArr.length){
      let currentIssues = yield select((state) => state.issues);
      let newIssues = {};
      let existedIssues = [];
      data.pileobj.issueArr.forEach(function(issueName, index, arr){
        currentIssues[issueName] ? existedIssues.push(issueName) : newIssues[issueName] = {include: [data.pileobj.id]}
      })
      yield put({
        type: PATCH_ISSUES,
        pileId: data.pileobj.id,
        newIssues: newIssues,
        existedIssues: existedIssues
      })
    }

    if(data.pileobj.tagArr.length){
      let currentTags = yield select((state) => state.tags);
      let newTags = {};
      let existedTags = [];
      data.pileobj.tagArr.forEach(function(pileTag, index, arr){
        currentTags[pileTag] ? existedTags.push(pileTag) : newTags[pileTag] = {include: [data.pileobj.id]}
      })
      yield put({
        type: PATCH_TAGS,
        pileId: data.pileobj.id,
        newTags: newTags,
        existedTags: existedTags
      })
    }
  }
}


// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
export default function * rootSaga () {
  yield fork(pileSubmit)
}
