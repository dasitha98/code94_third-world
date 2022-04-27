import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { createAudit } from "../../actions/audits"
import $ from 'jquery'

const NewAudit = (props) => {

    const [file, setFile] = React.useState(null)
    const [audit, setAudit] = React.useState({date: '', selectedFiles:null});

    const dispatch = useDispatch()

    const handleChange = (e) => setAudit({ ...audit, [e.target.id]: e.target.value });

    const handleFileChange = (e) => { 
        e.preventDefault();
        var file = e.target.files[0];
        setAudit({ ...audit, selectedFiles:file })
    };

    const validation = (object) => {
        for(var key in object) {
            if(object[key] === "" || object[key] === null) {
               return true
            }
        }
        return false
    }

    const handleSubmit = () => {
        console.log("daddy ", audit)
        let formData = new FormData()
        formData.append("date", audit.date)
        formData.append("selectedFiles", audit.selectedFiles)
        const isEmpty = validation(audit);
        if(isEmpty){
            document.getElementById('form').classList.add('was-validated')
            dispatch(dispatch({type: 'SHOW_ERROR', payload: {message: "Please fill required fields"}}))
        }else{
            dispatch(createAudit(formData))
            setAudit({date:'', selectedFiles:null})
            $('#addNewModal .close').click()
            document.getElementById('form').classList.remove('was-validated')
        }
    }

    return(
        <>
            {/* add new modal  */}
            <div id="addNewModal" class="modal fade " aria-labelledby="addNewModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title text-center" id="exampleModal">New Audit Report</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={() => setAudit({date:'', selectedFiles:null})}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="form">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Audit Date</label>
                                    <input type="date" class="form-control" id="date" value={audit.date} onChange={handleChange} aria-describedby="date" placeholder="date" required />
                                    {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                </div>
                                {/* <div class="form-group mt-5">
                                    <button class="btn btn-outline-dark">+ Upload Audit</button>
                                </div> */}
                                {!audit.selectedFiles ? 
                                    <span>
                                        <label htmlFor="selectedFiles">
                                            <span className='img-up-blog'>
                                                <i class="gd-file icon-text d-inline-block text-dark mt-2 mb-3"></i>
                                                <span className='mt-2'> PDF, XLS (Maximum file size 5MB)</span>
                                            </span>
                                        </label>
                                        <input type="file" className='d-none' onChange={handleFileChange} name="selectedFiles" id="selectedFiles" accept="application/pdf, application/vnd.ms-excel" />
                                    </span>
                                :
                                    <div class="alert alert-light alert-dismissible fade show" role="alert">
                                        <div class="row">
                                            <div class="col-md-2 d-flex align-items-center justify-content-center">
                                                <i class="gd-file"></i>                                           
                                            </div>
                                            <div class="col-md-9 d-flex align-items-center">
                                                {audit.selectedFiles.name}
                                                {console.log(audit)}
                                            </div>
                                            <div class="col-md-1 d-flex align-items-center justify-content-right">
                                                <button type="button" class="btn btn-default" onClick={() => setAudit({...audit, selectedFiles:null})}>
                                                    <i class="gd-close text-danger font-weight-bold"></i>                                           
                                                </button>                                          
                                            </div>
                                        </div>

                                    </div>
                                }
                            </form>
                        </div>
                        <div class="modal-footer justify-content-center">
                            <button type="button" class="btn btn-dark" onClick={() => handleSubmit()}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewAudit