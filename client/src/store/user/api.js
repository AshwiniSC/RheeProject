import { List } from 'immutable';
import Config from '../../config';
import { fetch } from '../../utils';
import UserModel from './user-model';

const HOSTNAME = process.env.API_HOSTNAME;
console.log("HOSTNAME",HOSTNAME)
export const loginUser = (credentials) => {
  return fetch(`${HOSTNAME}/api/v1/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then((res) => {
    return res.json()
   })
  .then((payload) => {
    if(payload.success === false) {
      throw new Error(payload.message)
    }
    return payload
  })
  .catch((error) => {
    throw error
  })
}

export const signupUser = (credentials) => {
  return fetch(`${HOSTNAME}/api/v1/registration`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then((res) => {
    return res.json()
   })
  .then((payload) => {
    if(payload.success === false) {
      throw new Error(payload.message)
    }
    return payload
  })
  .catch((error) => {
    throw error
  })
}

