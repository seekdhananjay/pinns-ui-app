import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import user from 'store/user.slice'
import images from 'store/images.slice'

const reducer = combineReducers({
  // here we will be adding reducers
  user,
  images,
})
const store = configureStore({
  reducer,
})
export default store;