export default (blogs = [], action) => {
    switch (action.type) {
        case 'DELETE_BLOG':
            return blogs.filter((blog) => blog._id !== action.payload);
        case 'UPDATE_BLOG':
            return blogs.map((blog) => blog._id === action.payload._id ? action.payload : blog)
        case 'FETCH_BLOGS':
            return action.payload
        case 'FETCH_BLOG_DETAILS':
            return [action.payload]
        case 'CREATE_BLOG':
            return [...blogs, action.payload]
        default:
            return blogs;
    }
} 