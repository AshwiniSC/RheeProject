import 'rxjs'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { createEpicMiddleware, combineEpics } from 'redux-observable'

import user, { userEpic } from './user/duck'
import dashboard, { dashboardEpic } from './dashboard/duck'
import app from './app'

// Bundling Epics
const rootEpic = combineEpics(
   userEpic,
   dashboardEpic,
)

// Creating Bundled Epic
const epicMiddleware = createEpicMiddleware(rootEpic)

// Define Middleware
const middleware = [
  thunk,
  promise(),
  epicMiddleware
]

// Define Reducers
const reducers = combineReducers({
  user,
  dashboard,
  form: formReducer,
})

// Create Store
export default createStore(reducers, {}, applyMiddleware(...middleware))
