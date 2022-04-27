import { Link } from "react-router-dom"
import Loader from "../Helpers/loader"
import { createAudit, deleteAudit, getAllAudits } from "../../actions/audits"

import delIcon from "../../assets/icons/deleteIcon.svg"
import editICon from "../../assets/icons/editIcon.svg"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import NewAudit from "./newAudit"
import EditAudit from "./editAudit"
import NoRecords from "../Helpers/noRecords"

const AuditsMain = (props) => {
    const [selectedAudit, setSelectedAudit] = useState(null)

    const audits = useSelector((state) => state.audit);
    const commonState = useSelector((state) => state.common)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllAudits())
    }, [dispatch])



    return(
        <>
            <div className="main-blog-sec">
                <div className="d-flex justify-content-between align-items-center">
                    <h2>AUDITS</h2>
                    <button className="add-btn" data-toggle="modal" data-target="#addNewModal">Add New</button>

                </div>
                <div class="container mt-5">
                    {/* {commonState.isLoading ?
                            <div style={{ height: "70vh" }} className="d-flex justify-content-center align-items-center">
                                <Loader />
                            </div>
                        :  
                            blogs && blogs?.map((blog) => (
                                <tr
                                    key={blog?._id}
                                    className="blog-row ">
                                    <td>{blog?.date}</td>
                                    <td className="w-50">{blog?.title}</td>
                                    <td>{blog?.author}</td>
                                    <td>

                                    </td>
                                </tr>
                            ))

                    } */}

                    {commonState.isLoading ?
                        <div style={{ height: "70vh" }} className="d-flex justify-content-center align-items-center">
                            <Loader />
                        </div>
                    :
                        <div class="row">
                            
                            {audits && audits.length === 0 ?

                                <NoRecords />

                            :
                            
                                audits && audits.map((audit) => {
                                    return(
                                        <div class="col-md-4 mt-5">
                                            <div class="card">
                                                <div class="card-body">
                                                    <h5 class="card-title">{audit.date.slice(0, 10)}</h5>     
                                                    <button className='blog-action '
                                                        data-toggle="modal"
                                                        data-target="#deleteModal"
                                                        onClick={() => setSelectedAudit(audit)}
                                                    >
                                                        <img src={delIcon} width="20" alt="" />
                                                    </button>
                
                                                    <button className='blog-action '
                                                        data-toggle="modal"
                                                        data-target="#editModal"
                                                        onClick={() => setSelectedAudit(audit)}
                                                    >
                                                        <img src={editICon} width="20" alt="" />
                                                    </button>
                                                    <a href={process.env.REACT_APP_API + audit.selectedFiles.path} target="_blank" class="card-link text-dark font-weight-bold float-right">View Report</a>
                                                </div>
                                            </div> 
                                        </div>
                                    )
                                })
                            }


                        </div>
                    }
                </div>
            </div>

            {/* delete modal  */}
            <div id="deleteModal" class="modal fade " aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModal">Are You Sure?</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            This Audit will permanently delete form the record.
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light" data-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-danger" onClick={() => dispatch(deleteAudit(selectedAudit._id))} data-dismiss="modal">Yes! go ahead.</button>
                        </div>
                    </div>
                </div>
            </div>

            <NewAudit />

            <EditAudit selectedAudit={selectedAudit} />

        </>


        // <span className="d-flex justify-content-around align-items-center">
        //     <button className='blog-action '
        //         data-toggle="modal"
        //         data-target="#exampleModal"
        //         onClick={() => setDelId(blog?._id)}
        //     >
        //         <img src={delIcon} width="20" alt="" />
        //     </button>

        //     <button className='blog-action '
        //         data-toggle="modal"
        //         data-target="#exampleModal"
        //         onClick={() => setDelId(blog?._id)}
        //     >
        //         <img src={editICon} width="20" alt="" />
        //     </button>
        // </span>
    )
}

export default AuditsMain