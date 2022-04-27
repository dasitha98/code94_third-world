import * as api from '../api'

export const createImage = (file) => async (dispatch) => {
    try {
        dispatch({type: 'SHOW_IMAGE_LOADER'})
        const {data} = await api.createImage(file);
        console.log("images....", data)
        dispatch({type: 'CREATE_IMAGE', payload: data})
        dispatch({type: 'HIDE_IMAGE_LOADER'})
        dispatch({type: 'SHOW_SUCCESS', payload: {message: "Image uploaded"}})
    } catch (error) {
        console.log(error)
        dispatch({type: 'SHOW_ERROR', payload: error})
    }
}





export const deleteImage = (id) => async (dispatch) => {
    try {
        dispatch({type: 'SHOW_IMAGE_LOADER'})
        await api.deleteImage(id)
        dispatch({type: 'DELETE_IMAGE', payload: id})
        dispatch({type: 'HIDE_IMAGE_LOADER'})
        dispatch({type: 'SHOW_SUCCESS', payload: {message: "Image deleted"}})
    } catch (error) {
        console.log(error)
        dispatch({type: 'SHOW_ERROR', payload: error})
    }
}

