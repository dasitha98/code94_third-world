import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { deleteBlog, getAllBlogs } from "../../actions/blogs"
import delIcon from "../../assets/icons/deleteIcon.svg"
import editICon from "../../assets/icons/editIcon.svg"
import Loader from "../Helpers/loader"
import NoRecords from "../Helpers/noRecords"

const BlogsMain = (props) => {
    const [delID, setDelId] = useState(null)
    const blogs = useSelector((state) => state?.blogs);
    const commonState = useSelector((state) => state.common)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllBlogs())
    }, [dispatch])



    return (
        <>
            <div className="main-blog-sec">
                <div className="d-flex justify-content-between align-items-center">
                    <h2>BLOGS</h2>
                    <Link to="/blogs/addNew"><button className="add-btn">Add New</button></Link>

                </div>
                <div>
                    {commonState.isLoading ?
                        <div style={{ height: "70vh" }} className="d-flex justify-content-center align-items-center">
                            <Loader />
                        </div>
                        : <table class="table blog-table" >
                            <tbody>
                                <tr className="t-head" >
                                    <th className="">PUBLISHED-DATE</th>
                                    <th className="">BLOG NAME</th>
                                    <th className="">AUTHOR</th>
                                    <th className="">ACTION</th>
                                </tr>

                                {blogs && blogs.length === 0 ?

                                    <tr><td colSpan={4}><NoRecords /></td></tr>

                                :
                                    blogs && blogs?.map((blog) => (
                                        <tr
                                            key={blog?._id}
                                            className="blog-row ">
                                            <td>{blog?.date}</td>
                                            <td className="w-50">{blog?.title}</td>
                                            <td>{blog?.author}</td>
                                            <td>
                                                <span className="d-flex justify-content-around align-items-center">
                                                    <button className='blog-action '
                                                        data-toggle="modal"
                                                        data-target="#exampleModal"
                                                        onClick={() => setDelId(blog?._id)}
                                                    >
                                                        <img src={delIcon} width="20" alt="" />
                                                    </button>

                                                    <Link to={`/blogs/update/${blog?._id}`}>
                                                        <button className='blog-action '>
                                                            <img width="20" src={editICon} alt="" />
                                                        </button>
                                                    </Link>
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>}
                </div>
            </div>

            {/* delete modal  */}
            <div id="exampleModal" class="modal fade " aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModal">Are You Sure?</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            This blog will permanently delete form the record.
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light" data-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-danger" onClick={() => dispatch(deleteBlog(delID))} data-dismiss="modal">Yes! go ahead.</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogsMain