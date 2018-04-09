import { fetch } from '../../utils'

const HOSTNAME = process.env.API_HOSTNAME

export const getDashboardData = (data) => {
  console.log(data, 'this is data for appliction Analytics');
  return fetch(`${HOSTNAME}/api/v1/analytics`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((res) => {
    return res.json()
  })
  .then((payload) => {
    return payload
  }).catch((error) => {
    throw error
  })
}
