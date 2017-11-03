
import { createSelector } from 'reselect'


// ------------------------------------
// fetchGetFlow -- 抓取instance
// ------------------------------------
export const selectFetchGetFlow = () => state => state.fetchGetFlow
export const selectFetchGetFlowRes = () => createSelector(
  selectFetchGetFlow(),
  fetchGetFlow => fetchGetFlow && fetchGetFlow.response
)
export const selectFetchGetFlowCount = () => createSelector(
  selectFetchGetFlow(),
  fetchGetFlow => fetchGetFlow && fetchGetFlow.count
)
export const selectFetchGetFlowState = () => createSelector(
  selectFetchGetFlow(),
  fetchGetFlow => fetchGetFlow && fetchGetFlow.fetching
)
export const fetchGetFlowSuccess = state => (selectFetchGetFlow()(state).count.success !== 0)
