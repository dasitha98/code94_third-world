export default (state = {isLoading: false, isImageLoading: false, error: null, success: null, notification: null}, action) => {
    switch (action.type) {
        case 'SHOW_LOADER':
            return {...state, isLoading: true, error: null, success: null}
            // return {isLoading: true, error: null, success: null, notification: null}
        case 'HIDE_LOADER':
            return {...state, isLoading: false, error: null, success: null}
            // return {isLoading: false, error: null, success: null, notification: null}
        case 'SHOW_IMAGE_LOADER':
            return {...state, isImageLoading: true}        
        case 'HIDE_IMAGE_LOADER':
            return {...state, isImageLoading: false}
        case 'SHOW_ERROR':
            return {isLoading: false, error:true ,notification: action.payload, success: null}
        case 'SHOW_SUCCESS':
            return {isLoading: false, error: null, success: true, notification: action.payload}
        case 'RESET_STATE':
            console.log("RESET STATE CALLED")
            return {isLoading: false, error: null, success: null, notification: null}
        default:
            return state;
    }
} 