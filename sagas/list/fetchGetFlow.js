
import fetchGetFlow from 'api/list/fetchGetFlow.js'
import * as apiAction from 'actions/list/fetchGetFlow.js'
import { put } from 'redux-saga/effects'

// ------------------------------------
// fetchGetFlow -- 抓取instance
// ------------------------------------
export default function * fetchGetFlowSaga (action) {
  try {
    const res = yield fetchGetFlow(action.payload)
    yield put(apiAction['fetchGetFlowSuccess']({ payload: res }))
  } catch (err) {
    console.log('fetchGetFlow —— this err need to tested');
    yield put(apiAction['fetchGetFlowFailure']({ payload: err }))
  }
}
