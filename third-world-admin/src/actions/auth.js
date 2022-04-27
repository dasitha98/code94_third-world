import * as api from '../api/index.js';
import decode from 'jwt-decode'

export const signIn = (formData, router) => async (dispatch) => {
  try {
    dispatch({type: 'SHOW_LOADER'})

    const { data } = await api.signIn(formData);
    console.log("action ",data);
    dispatch({ type: 'AUTH', data });
    dispatch({type: 'HIDE_LOADER'})
    const token = data.token

    router.push('/blogs')

  } catch (error) {
    console.log(error);
    dispatch({type: 'SHOW_ERROR', payload: {message: "Access denied. Check your email or password"}})
  }
};

export const addUser = (formData, router) => async (dispatch) => {
  try {
    dispatch({type: 'SHOW_LOADER'})
    const { data } = await api.addUser(formData);

    dispatch({ type: 'CREATE_USER', data });
    dispatch({type: 'HIDE_LOADER'})
    dispatch({type: 'SHOW_SUCCESS', payload: {message: "User created"}})
  } catch (error) {
    console.log(error);
    dispatch({type: 'SHOW_ERROR', payload: error})
  }
};


export const getUserData = (id) => async (dispatch) => {
  try {
    // const data = JSON.parse(localStorage.getItem('profile'))
    console.log(id);
    const { data } = await api.getUser(id);
    console.log(data);

    // console.log("user data from actions ", data)
    dispatch({type: 'USER_DATA', data})
  } catch (error) {
    console.log(error)
    dispatch({type: 'SHOW_ERROR', payload: error})
  }
}

export const updateUser = (id, post) => async (dispatch) => {
  try {
    dispatch({type: 'SHOW_LOADER'})
    const {data} = await api.updateUser(id, post);
    dispatch({type: 'UPDATE_USER', payload: data})
    dispatch({type: 'HIDE_LOADER'})
    dispatch({type: 'SHOW_SUCCESS', payload: {message: 'User details updated. Please login again to apply changes'}})
  } catch (error) {
    console.log(error)
    dispatch({type: 'SHOW_ERROR', payload: error})
  }
}

export const getUserList = () => async (dispatch) => {
  try {
    const {data} = await api.fetchUsers();
    dispatch({type: 'FETCH_USERS', payload: data})
  } catch (error) {
      console.log(error)
      dispatch({type: 'SHOW_ERROR', payload: error})
  }
}


export const deleteUser = (id) => async (dispatch) => {
  try {
      dispatch({type: 'SHOW_LOADER'})
      await api.deleteUser(id);
      console.log("action ",id);
      dispatch({type: 'DELETE_USER', payload: id})
      dispatch({type: 'HIDE_LOADER'})
      dispatch({type: 'SHOW_SUCCESS', payload: {message: "User deleted successfully"}})
  } catch (error) {
      console.log(error)
      dispatch({type: 'SHOW_ERROR', payload: error})
  }
}

export const updatePassword = (id, password) => async (dispatch) => {
  try {
      dispatch({type: 'SHOW_LOADER'})
      await api.updatePassword(id, password)
      dispatch({type: 'UPDATE_PASSWORD', payload: id})
      dispatch({type: 'HIDE_LOADER'})
      dispatch({type: 'SHOW_SUCCESS', payload: {message: "Password updated"}})
  } catch (error) {
      console.log(error)
      dispatch({type: 'SHOW_ERROR', payload: error})
  }
}

export const forgotPassword = (formData) => async (dispatch) => {
  try {
      dispatch({type: 'SHOW_LOADER'})
      const {data} = await api.forgotPassword(formData)
      dispatch({type: 'HIDE_LOADER'})
      dispatch({type: 'SHOW_SUCCESS', payload: {message: data.message}})
  } catch (error) {
      console.log(error)
      dispatch({type: 'SHOW_ERROR', payload: error})
  }
}

export const resetPassword = (formData, history) => async (dispatch) => {
  try {
      dispatch({type: 'SHOW_LOADER'})
      const {data} = await api.resetPassword(formData)
      dispatch({type: 'HIDE_LOADER'})
      dispatch({type: 'SHOW_SUCCESS', payload: {message: data.message}})
      history.push('/auth/login')
  } catch (error) {
      console.log(error)
      dispatch({type: 'SHOW_ERROR', payload: error})
  }
}