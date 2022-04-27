const Loader = () => {
    return(
        <div class="container h-100">
            <div class="row align-items-center h-100">
                <div class="col-6 mx-auto">
                    <div class="jumbotron bg-transparent">
                        <div class="text-center">
                            <div class="spinner-border" style={{width: '3rem', height: '3rem'}} role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader