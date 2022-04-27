import * as api from '../api'

export const getAllBlogs = () => async (dispatch) => {
    try {
        dispatch({ type: 'SHOW_LOADER' })
        const { data } = await api.fetchBlogs();
        console.log(data)
        dispatch({ type: 'FETCH_BLOGS', payload: data })
        dispatch({ type: 'HIDE_LOADER' })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'SHOW_ERROR', payload: error })
    }
}

export const getBlogDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'SHOW_LOADER' })
        dispatch({ type: 'CLEAR_IMAGES' })
        const { data } = await api.fetchBlogDetails(id);
        console.log("data from actions ", data)
        dispatch({ type: 'FETCH_BLOG_DETAILS', payload: data })
        // dispatch({ type: 'CREATE_IMAGE_FOR_EDIT', payload: data[0].selectedFiles })
        dispatch({ type: 'HIDE_LOADER' })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'SHOW_ERROR', payload: error })
    }
}

export const createBlog = (post, history) => async (dispatch) => {
    try {
        dispatch({ type: 'SHOW_LOADER' })
        const { data } = await api.createBlog(post);
        dispatch({ type: 'CREATE_POST', payload: data })
        dispatch({ type: 'HIDE_LOADER' })
        dispatch({ type: 'SHOW_SUCCESS', payload: { message: "Post created" } })
        dispatch({ type: 'CLEAR_IMAGES' })
        history.push('/blogs')
    } catch (error) {
        console.log(error)
        dispatch({ type: 'SHOW_ERROR', payload: error })
    }
}


export const updateBlog = (id, post, history) => async (dispatch) => {
    try {
        dispatch({ type: 'SHOW_LOADER' })
        const { data } = await api.updateBlog(id, post);
        dispatch({ type: 'UPDATE_BLOG', payload: data })
        dispatch({ type: 'HIDE_LOADER' })
        dispatch({ type: 'SHOW_SUCCESS', payload: { message: "BLOG updated" } })
        history.push('/blogs')
        dispatch({ type: 'CLEAR_IMAGES' })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'SHOW_ERROR', payload: error })
    }
}


export const deleteBlog = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'SHOW_LOADER' })
        await api.deleteBlog(id)
        dispatch({ type: 'DELETE_BLOG', payload: id })
        dispatch({ type: 'HIDE_LOADER' })
        dispatch({ type: 'SHOW_SUCCESS', payload: { message: "Blog deleted" } })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'SHOW_ERROR', payload: error })
    }
}

