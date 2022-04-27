export const resetState = () => async (dispatch) => {
    try {
        dispatch({type: 'RESET_STATE'})
    } catch (error) {
        console.log(error)
        dispatch({type: 'SHOW_ERROR', payload: error})
    }
}
