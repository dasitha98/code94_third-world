import React from "react"
import { useDispatch } from "react-redux"
import { updateAudit } from "../../actions/audits"

const EditAudit = (props) => {

    const [selectedAudit, setSelectedAudit] = React.useState('')

    const dispatch = useDispatch()

    const handleChange = (e) => setSelectedAudit({ ...selectedAudit, [e.target.name]: e.target.value });

    const handleFileUpdate = (e) => { 
        e.preventDefault();
        var file = e.target.files[0];
        setSelectedAudit({ ...selectedAudit, selectedFiles:file })
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        console.log("daddy ", selectedAudit)
        let formData = new FormData()
        formData.append("date", selectedAudit.date)
        formData.append("selectedFiles", selectedAudit.selectedFiles)
        dispatch(updateAudit(selectedAudit._id, formData))
    }

    React.useEffect(() => {
        setSelectedAudit(props.selectedAudit)
    }, [props])

    return(
        <>
            {/* edit modal  */}
            <div id="editModal" class="modal fade " aria-labelledby="editModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModal">Edit Audit</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="form">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Audit Date</label>
                                    <input type="date" class="form-control" id="date" name="date" value={selectedAudit && selectedAudit.date.substring(0,10)} onChange={handleChange} aria-describedby="date" placeholder="date" required />
                                </div>
                                {console.log("selectedAudit", selectedAudit)}
                                {selectedAudit && !selectedAudit.selectedFiles ? 
                                    <span>
                                        <label htmlFor="selectedFilesUpdate">
                                            <span className='img-up-blog'>
                                                <i class="gd-file icon-text d-inline-block text-dark mt-2 mb-3"></i>
                                                <span className='mt-2'> PDF, XLS (Maximum file size 5MB)</span>
                                            </span>
                                        </label>
                                        <input type="file" className='d-none' onChange={handleFileUpdate} name="selectedFiles" id="selectedFilesUpdate" accept="application/pdf, application/vnd.ms-excel" />
                                    </span>
                                :
                                    <div class="alert alert-light alert-dismissible fade show" role="alert">
                                        <div class="row">
                                            <div class="col-md-2 d-flex align-items-center justify-content-center">
                                                <i class="gd-file"></i>                                           
                                            </div>
                                            <div class="col-md-9 d-flex align-items-center">
                                                {selectedAudit && selectedAudit.selectedFiles.originalname || selectedAudit && selectedAudit.selectedFiles.name}
                                                {console.log(selectedAudit)}
                                            </div>
                                            <div class="col-md-1 d-flex align-items-center justify-content-right">
                                                <button type="button" class="btn btn-default" onClick={() => setSelectedAudit({...selectedAudit, selectedFiles:null})}>
                                                    <i class="gd-close text-danger font-weight-bold"></i>                                           
                                                </button>                                          
                                            </div>
                                        </div>

                                    </div>
                                }
                            </form>
                        </div>
                        <div class="modal-footer justify-content-center">
                            <button type="button" class="btn btn-dark" onClick={(e) => handleUpdate(e)} data-dismiss="modal">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditAudit