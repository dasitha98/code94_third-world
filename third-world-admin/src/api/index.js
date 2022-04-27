import axios from 'axios'


const API_IMAGE = axios.create({ baseURL: process.env.REACT_APP_API, timeout: 40000, headers: { "Content-Type": "multipart/form-data" } });

const API = axios.create({ baseURL: process.env.REACT_APP_API, timeout: 40000, headers: { "Content-Type": "multipart/form-data" } });


API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchBlogs = () => API.get('/blogs/all-blogs');
export const fetchBlogDetails = (id) => API.get(`/blogs/${id}`);
export const createBlog = (newPost) => API.post('/blogs', newPost);
export const updateBlog = (id, updatedPost) => API.patch(`/blogs/${id}`, updatedPost);
export const deleteBlog = (id) => API.delete(`/blogs/${id}`);

export const fetchAudits = () => API.get('/audits');
export const fetchAuditDetails = (id) => API.get(`/audits/${id}`);
export const createAudit = (newPost) => API.post('/audits', newPost);
export const updateAudit = (id, updatedPost) => API.patch(`/audits/${id}`, updatedPost);
export const deleteAudit = (id) => API.delete(`/audits/${id}`);

export const createImage = (image) => API_IMAGE.post('/images', image);
export const deleteImage = (id) => API_IMAGE.delete(`/images/${id}`);

export const signIn = (data) => API.post('/users/signin', data);
export const addUser = (data) => API.post('/users/signup', data);
export const fetchUsers = () => API.get('/users/getallusers');
export const getUser = (id) => API.get(`/users/getuser/${id}`);
export const deleteUser = (id) => API.delete(`/users/deleteuser/${id}`);
export const updatePassword = (id, password) => API.patch(`/users/userpassword/${id}`, password);
export const updateUser = (id, post) => API.patch(`/users/updateuser/${id}`, post);

export const forgotPassword = (data) => API.post('/users/forgotpassword', data);
export const resetPassword = (data) => API.patch('/users/resetpassword', data);

