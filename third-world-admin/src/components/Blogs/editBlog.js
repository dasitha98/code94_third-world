import { useState, useEffect } from 'react';
import arrowRight from '../../assets/icons/arrowRight.svg'
import imgThumbIcon from '../../assets/icons/imgThumbIcon.svg'
import { EditorState, convertToRaw, convertFromHTML, ContentState } from "draft-js";

// import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog, getBlogDetails, updateBlog } from '../../actions/blogs';
import { useHistory, useParams } from 'react-router-dom';


const EditBlog = (props) => {

    const [blogData, setBlogData] = useState({title: '', image: '', date: ''})
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [imagePreview, setImagePreview] = useState("")

    const dispatch = useDispatch()
    const history = useHistory()

    const { id } = useParams()
    const blogState = useSelector((state) => state.blogs)[0];
    const commonState = useSelector((state) => state.common)

    function onEditorStateChange(editorState) {
        setEditorState(editorState)
    }

    // todays date 
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = mm + '-' + dd + '-' + yyyy;

    const handleInput = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newProduct = { ...blogData };
        newProduct[field] = value;
        setBlogData(newProduct)
    }

    const validation = (object) => {
        for(var key in object) {
            if(object[key] === "" || object[key] === null) {
                return true
            }
        }
        return false
    }

    const imageHandler = e => {
        const imageData = e.target.files[0]
        const reader = new FileReader()
        reader.onload = () => {
            setImagePreview(reader.result);
        }
        reader.readAsDataURL(imageData);
    }

    const handleUpdate = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("title", blogData.title)
        formData.append("date", blogData.date)
        formData.append("author", blogData.author)
        formData.append("image", blogData.image)
        formData.append("description", draftToHtml(convertToRaw(editorState.getCurrentContent())))

        const isEmpty = validation(blogData);
        if(isEmpty){
            document.getElementById('form').classList.add('was-validated')
            dispatch(dispatch({type: 'SHOW_ERROR', payload: {message: "Please fill required fields"}}))
        }else{
            dispatch(updateBlog(id, formData, history))
        }

    }

    useEffect(() => {
        dispatch(getBlogDetails(id))
    }, [])

    useEffect(() => {
        setBlogData({title: blogState?.title, image: blogState?.image, date: blogState?.date, author: blogState?.author})
        setEditorState(EditorState.createWithContent(
            ContentState.createFromBlockArray(
                convertFromHTML(`${blogState?.description}`)
            )
        ))
    }, [blogState])

    return (
        <>
            <div className="main-blog-sec">
                {/* <div dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(editorState.getCurrentContent())) }} /> */}
                <div> <h2 className='d-flex  align-items-center '>BLOGS <img className='mx-3' src={arrowRight} alt="" /><span> ADD NEW BLOG</span></h2></div>

                <div className='my-5'>
                    <form id='form'>

                        <div className="add-blog-from-design">

                            <label htmlFor="topic">Title</label>
                            <input type="text" id="title" name="title" value={blogData.title} onInput={handleInput} required />

                            <label htmlFor="author">Author Name</label>
                            <span id="author">{blogData.author}</span>

                            <label htmlFor="date">Publish Date</label>
                            <span id="date">{blogData.date}</span>

                            <label htmlFor="blog-content">Blog</label>
                            <Editor
                                editorState={editorState}
                                onEditorStateChange={onEditorStateChange}
                                toolbar={{
                                    options: ['inline', 'list', 'textAlign', 'blockType', 'fontFamily', 'fontSize'],
                                    inline: { inDropdown: false, options: ['bold', 'italic', 'underline', 'strikethrough'], },
                                    list: { inDropdown: false, options: ['unordered', 'ordered',] },
                                    textAlign: { inDropdown: false },
                                    link: { inDropdown: true },
                                    history: { inDropdown: true },

                                }}

                            />

                            <label htmlFor="blog-image"  class="mt-5">Featured Image</label>
                            {blogData.image !== '' || blogData.image === null ?
                                <div className='img-preview'  class="mt-5">
                                    <img width="300" src={blogData?.image?.path? process.env.REACT_APP_API +  blogData?.image?.path : imagePreview && imagePreview} alt="" />
                                    <button onClick={() => setBlogData({...blogData, image:''})} className='btn btn-default text-danger'>Remove</button>
                                </div>
                                : <span  class="mt-5">
                                    <label htmlFor="image-blog">
                                        <span className='img-up-blog'>
                                            <img width="30" src={imgThumbIcon} alt="" />
                                            <span className='mt-2'> PNG, SVG or GIF (Maximum file size 5MB)</span>
                                            <span className='mt-2'> Image size: 1120 x 400</span>
                                        </span>
                                    </label>
                                    <input type="file" className='d-none' onChange={(e) => {
                                        setBlogData({...blogData, image:e.target.files[0]})
                                        imageHandler(e)
                                    }
                                    } name="image" id="image-blog" />
                                </span>}


                        </div>
                        <div className='d-flex justify-content-end mt-5 mb-3'>
                            <button className='add-btn' onClick={(e) => handleUpdate(e)}>Update Blog</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditBlog