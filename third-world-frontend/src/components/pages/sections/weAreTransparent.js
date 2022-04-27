const WeAreTransparentSection = () => {
    return (
      <>
          <section>
              {/* section for we are transparent */}
              <div class="p-5 bg-orange text-white rounded">
                <div class="container text-dark">
                  <div class="row">
                    <div class="col-md-7 row align-items-center order-2 order-md-1 justify-content-center">
                      <div class="w-75">
                        <h1>We are Transparent</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        <button className="we-are-transparent-button ">
                          <span>
                              <img src='./assets/img/icons/eye.svg' alt="" />
                              <span>View Accounts</span>
                          </span>
                        </button> 
                      </div>
                    </div>
                    <div class="col-md-5 text-center order-1 order-md-2">
                      <img class="img-fluid float" src="./assets/img/Money_bag.png" />
                    </div>
                  </div>
                </div>
              </div>
          </section>
      </>
    );
  }
  
  export default WeAreTransparentSection