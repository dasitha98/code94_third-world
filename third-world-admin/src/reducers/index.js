import {combineReducers} from 'redux'
import audit from './audit'
import auth from './auth'
import blogs from './blogs'
import common from './common'


export default combineReducers({ 
    auth, 
    audit, 
    blogs, 
    common
})

