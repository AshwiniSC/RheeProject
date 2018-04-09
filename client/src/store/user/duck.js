import Rx from 'rxjs/Rx'
import { Record } from 'immutable'
import { combineEpics } from 'redux-observable'
import HttpStatus from 'http-status-codes'
import { assign } from 'lodash'

import { INIT, LOADING, SUCCESS, ERROR } from '../../constants/phase'
import Config from '../../config'

import * as api from './api'

/***********************************
 * Action Types
 ***********/

export const LOGIN_USER = 'pointer/user/LOGIN_USER'
export const LOGIN_USER_SUCCESS = 'pointer/user/LOGIN_USER_SUCCESS'
export const LOGIN_USER_ERROR = 'pointer/user/LOGIN_USER_ERROR'


export const SIGNUP_USER = 'pointer/user/SIGNUP_USER'
export const SIGNUP_USER_SUCCESS = 'pointer/user/SIGNUP_USER_SUCCESS'
export const SIGNUP_USER_ERROR = 'pointer/user/SIGNUP_USER_ERROR'

export const SIGN_OUT = 'pointer/user/SIGN_OUT'
export const SIGN_OUT_SUCCESS = 'pointer/user/SIGN_OUT_SUCCESS'

export const CLEAR_PHASE = 'pointer/user/CLEAR_PHASE'

/***********************************
 * Initial State
 ***********/

// Unlike other ducks we are taking a class style approach
// for creating the InitialState. This is becuase we need to fetch the
// locally stored token in the constructor when it is created
const InitialStateInterface = {
  token: null,  // We need this here to tell InitialState that there is a token key,
                // but it will be reset below to what is in localStorage, unless a value
                // is passed in when the object is instanciated
  phase: INIT,
  patchPhase: INIT,
  user: null,
  users: [],
  userdata:[],
  dataPhase: INIT,
  error: null,
  isSubmitting: false,
  message:'',
  success:'',
}
class InitialState extends Record(InitialStateInterface) {
  constructor(desiredValues) {
    // When we construct InitialState, we automatically update it's default value
    // for token to be what is stored in localStorage
    const token = localStorage.getItem(Config.LocalStorageKeys.Authorization)
    super(assign({ token }, desiredValues))
  }
}

/***********************************
 * Reducer
 ***********/

// eslint-disable-next-line complexity, max-statements
export default function (state = new InitialState(), action = {}) {

  switch (action.type) {
    case LOGIN_USER: {
      return state
        .set('phase', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }

    case LOGIN_USER_SUCCESS: {
      const { payload } = action
      window.localStorage.setItem(Config.LocalStorageKeys.Authorization, payload.data.token)
      window.localStorage.setItem("user", JSON.stringify(payload.data.account))
      return state
        .set('phase', SUCCESS)
        .set('user', payload.data.account)
        .set('error', null)
        .set('isSubmitting', false)
    }

    case LOGIN_USER_ERROR: {
      const { payload } = action
      return state
        .set('error', payload.error)
        .set('phase', ERROR)
        .set('isSubmitting', false)
    }
    
    case SIGNUP_USER: {
      return state
        .set('phase', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }

    case SIGNUP_USER_SUCCESS: {
      const { payload } = action
      window.localStorage.setItem(Config.LocalStorageKeys.Authorization, payload.data.token)
      window.localStorage.setItem("user", JSON.stringify(payload.data.account))
      return state
        .set('phase', SUCCESS)
        .set('user', payload.data.account)
        .set('error', null)
        .set('isSubmitting', false)
    }

    case SIGNUP_USER_ERROR: {
      const { payload } = action
      return state
        .set('error', payload.error)
        .set('phase', ERROR)
        .set('isSubmitting', false)
    }


    case SIGN_OUT: {
      localStorage.clear();
      localStorage.removeItem("user")
      return new InitialState()
    }

     case CLEAR_PHASE: {
     return state
        .set('dataPhase', INIT)
    }

    default: {
      return state
    }
  }
}


/***********************************
 * Action Creators
 ***********/

export const loginUser = (credentials) => {
  return {
    type: LOGIN_USER,
    payload: credentials
  }
}

export const signUpUser = (credentials) => {
  return {
    type: SIGNUP_USER,
    payload: credentials
  }
}

export const handleSignOut = () => ({
  type: SIGN_OUT
})

export const clearPhase = () => ({
  type: CLEAR_PHASE
})


/***********************************
 * Epics
 ***********************************/
const loginUserEpic = (action$) =>
  action$
  .ofType(LOGIN_USER)
  .mergeMap((action) => {
    return Rx.Observable.fromPromise(api.loginUser(action.payload))
    .flatMap((payload) => ([{
      type: LOGIN_USER_SUCCESS,
      payload
    }]))
    .catch((error) => Rx.Observable.of({
      type: LOGIN_USER_ERROR,
      payload: { error }
    }))
  })

const signUpUserEpic = (action$) =>
  action$
  .ofType(SIGNUP_USER)
  .mergeMap((action) => {
    return Rx.Observable.fromPromise(api.signupUser(action.payload))
    .flatMap((payload) => ([{
      type: SIGNUP_USER_SUCCESS,
      payload
    }]))
    .catch((error) => Rx.Observable.of({
      type: SIGNUP_USER_ERROR,
      payload: { error }
    }))
  })

export const userEpic = combineEpics(
  loginUserEpic,
  signUpUserEpic,
)
