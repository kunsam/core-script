
import xFetch from '../utils'
import omit from 'lodash/omit'

// 注意：如果query中value值包括数字0/false/null，均会被判定为无该query，请避免使用
// ------------------------------------
// EXAMPLE
// ------------------------------------
// export default function fetchX (payload) {
//   return xFetch({
//     url: '/users',
//     method: 'GET', // GET, POST, PUT, PATCH, HEAD, OPTIONS or DELETE,
//     body: payload.x,
//     credentials: 'include' // which will allow both CORS and same origin requests to work with cookies
//   })
// }
 
  
// ------------------------------------
// fetchGetFlow -- 抓取instance
// ------------------------------------
export default function fetchGetFlow (payload) {
	const { flow_id } = payload
	const bodyPayload = omit(payload, ['flow_id'])
  return xFetch({
    query: null,
    url: `/workFlow/${flow_id}`,
    body: bodyPayload,
    method: 'GET' // GET, POST, PUT, PATCH, HEAD, OPTIONS or DELETE
  })
}