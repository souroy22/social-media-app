import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'

// to see reducer in redux dev tool
const composeEnhancers = compose

// middleware to help async call
const enhancer = composeEnhancers(applyMiddleware(thunk))

const reduxStore = createStore(reducers, enhancer)

export default reduxStore
