const NoRecords = (props) => {
    return(
        <div class="container h-100">
            <div class="row align-items-center h-100">
                <div class="col-6 mx-auto">
                    <div class="jumbotron bg-transparent">
                        <div class="text-center">
                            <h3>No Records</h3>
                            <small class="text-muted">You have to add records before they show up here</small><br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoRecords