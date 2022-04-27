import { useState, useEffect } from 'react';
import arrowRight from '../../assets/icons/arrowRight.svg'
import imgThumbIcon from '../../assets/icons/imgThumbIcon.svg'
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { createBlog } from '../../actions/blogs';
import { useHistory } from 'react-router-dom';


const NewBlog = (props) => {

    const [blogData, setBlogData] = useState({})
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const dispatch = useDispatch()
    const history = useHistory()

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

    const imageHandler = e => {
        const imageData = e.target.files[0]
        const reader = new FileReader()
        reader.onload = () => {
            setImagePreview(reader.result);
        }
        reader.readAsDataURL(imageData);
    }

    const handleForm = (e) => {
        e.preventDefault()
        blogData.date = today
        blogData.author = user.result.name
        blogData.description = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        blogData.image = image

        const blogInfo = new FormData()
        for (let key in blogData) {
            blogInfo.append(key, blogData[key]);
        }

        // axios.post(`http://localhost:5000/api/add-blog`, blogInfo).then(res => {
        //     console.log(res.data);
        //     e.target.reset()
        //     setEditorState(EditorState.createEmpty())
        //     setImagePreview("")

        // })

        dispatch(createBlog(blogInfo, history))
        e.target.reset()
        setEditorState(EditorState.createEmpty())
        setImagePreview("")
    }


    return (
        <>
            <div className="main-blog-sec">
                {/* <div dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(editorState.getCurrentContent())) }} /> */}
                <div> <h2 className='d-flex  align-items-center '>BLOGS <img className='mx-3' src={arrowRight} alt="" /><span> ADD NEW BLOG</span></h2></div>

                <div className='my-5'>
                    <form onSubmit={handleForm} encType="multipart/form-data">

                        <div className="add-blog-from-design">

                            <label htmlFor="topic">Topic</label>
                            <input type="text" id="topic" name="title" onInput={handleInput} required />

                            <label htmlFor="author">Author Name</label>
                            <span id="author">{user.result.name}</span>

                            <label htmlFor="date">Publish Date</label>
                            <span id="date">{today} </span>

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

                            <label htmlFor="blog-image" class="mt-5">Featured Image</label>
                            {image ?
                                <div className='img-preview' class="mt-5">
                                    <img width="300" src={imagePreview} alt="" />
                                    <button onClick={() => {
                                        setImagePreview(null)
                                        setImage(null)
                                    }} className='btn btn-default text-danger'>Remove</button>
                                </div>
                                : <span class="mt-5">
                                    <label htmlFor="image-blog">
                                        <span className='img-up-blog'>
                                            <img width="30" src={imgThumbIcon} alt="" />
                                            <span className='mt-2'> PNG, SVG or GIF (Maximum file size 5MB)</span>
                                            <span className='mt-2'> Image size: 1120 x 400</span>
                                        </span>
                                    </label>
                                    <input type="file" className='d-none' onChange={(e) => {
                                        setImage(e.target.files[0])
                                        imageHandler(e)
                                    }
                                    } name="image" id="image-blog" />
                                </span>}


                        </div>
                        <div className='d-flex justify-content-end mt-5 mb-3'>
                            <input type="submit" className='add-btn' value="Upload Blog" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default NewBlog