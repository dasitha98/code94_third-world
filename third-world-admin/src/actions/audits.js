import * as api from '../api'

export const getAllAudits = () => async (dispatch) => {
    try {
        dispatch({type: 'SHOW_LOADER'})
        const {data} = await api.fetchAudits();
        console.log(data)
        dispatch({type: 'FETCH_AUDITS', payload: data})
        dispatch({type: 'HIDE_LOADER'})
    } catch (error) {
        console.log(error)
        dispatch({type: 'SHOW_ERROR', payload: error})
    }
}

export const getAuditDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: 'SHOW_LOADER'})
        dispatch({type: 'CLEAR_IMAGES'})
        const {data} = await api.fetchAuditDetails(id);
        console.log("data from actions ", data)
        dispatch({type: 'FETCH_AUDIT_DETAILS', payload: data})
        dispatch({type: 'HIDE_LOADER'})
    } catch (error) {
        console.log(error)
        dispatch({type: 'SHOW_ERROR', payload: error})
    }
}

export const createAudit = (post) => async (dispatch) => {
    try {
        dispatch({type: 'SHOW_LOADER'})
        const {data} = await api.createAudit(post);
        dispatch({type: 'CREATE_AUDIT', payload: data.savedAudit})
        dispatch({type: 'HIDE_LOADER'})
        dispatch({type: 'SHOW_SUCCESS', payload: {message: "Audit created"}})
    } catch (error) {
        console.log(error)
        dispatch({type: 'SHOW_ERROR', payload: error})
    }
}


export const updateAudit = (id, post, history) => async (dispatch) => {
    try {
        dispatch({type: 'SHOW_LOADER'})
        const {data} = await api.updateAudit(id, post);
        dispatch({type: 'UPDATE_AUDIT', payload: data})
        dispatch({type: 'HIDE_LOADER'})
        dispatch({type: 'SHOW_SUCCESS', payload: {message: "Audit updated"}})
        dispatch({type: 'CLEAR_IMAGES'})
    } catch (error) {
        console.log(error)
        dispatch({type: 'SHOW_ERROR', payload: error})
    }
}


export const deleteAudit = (id) => async (dispatch) => {
    try {
        dispatch({type: 'SHOW_LOADER'})
        await api.deleteAudit(id)
        dispatch({type: 'DELETE_AUDIT', payload: id})
        dispatch({type: 'HIDE_LOADER'})
        dispatch({type: 'SHOW_SUCCESS', payload: {message: "Audit deleted"}})
    } catch (error) {
        console.log(error)
        dispatch({type: 'SHOW_ERROR', payload: error})
    }
}

