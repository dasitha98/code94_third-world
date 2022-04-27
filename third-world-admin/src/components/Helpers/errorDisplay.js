const ErrorDisplay = (props) => {
    return(
        <div class="container h-100">
            <div class="row align-items-center h-100">
                <div class="col-6 mx-auto">
                    <div class="jumbotron bg-transparent">
                        <div class="text-center">
                            <h3>Aw snap !</h3>
                            <small class="text-muted">somthing went wrong. Try again later</small><br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorDisplay