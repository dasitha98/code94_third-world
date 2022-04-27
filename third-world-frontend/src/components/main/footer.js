import React from "react";

const Footer = () => {

    return (

      <>

           <footer className="footer font-small blue pt-4 container-footer">


              <div className="container-fluid text-center">

                    <div className="row">
                        <h1 class="text-white">Get in Touch</h1>
                    </div>


                      <div className="row d-flex justify-content-center footer-row mx-auto">
                              
                              <div className="col col-lg-1 p-0"><a href="#!" className="sbtn btn-large mx-1">
                                        <button className="footer-btn"><img className="footer-twt" src={"./assets/images/Vector.png"}/></button>

                                    </a>
                              </div>

                            <div className="col col-lg-1 p-0"><a href="#!" className="sbtn btn-large mx-1">
                                        <button className="footer-btn"><img className="footer-inst" src={"./assets/images/Vector\ \(1\).png"}/></button>

                                    </a>
                              </div>



                            <div className="col col-lg-1 p-0"><a href="#!" className="sbtn btn-large mx-1">

                                        <button className="footer-btn"><img className="footer-discord" src={"./assets/images/Vector\ \(2\).png"}/></button>

                                    </a>
                              </div>

                            
                            
                          </div>

                    <div className="row">
                        <div className="footer-down-text text-center">
                          © 2021 Third World   | <a href="#!">Privacy Policy </a>
                        </div>
                    </div>
                      
              </div>



              
              
        </footer>

        <div class="slide-option-footer" >
          <div id="infinite" class="text-slider">
            <div class="container text-barrier w-100 mx-0">
              <ul class="text-wrapper mb-2">
                <li class="slide-item"><span>Developed by Code94 Labs <img src={"./assets/images/Flash_perspective_matte 1.png"} alt="" /></span></li>
                <li class="slide-item"><span>Developed by Code94 Labs <img  src={"./assets/images/Flash_perspective_matte 1.png"} alt="" /></span></li>
                <li class="slide-item"><span>Developed by Code94 Labs <img  src={"./assets/images/Flash_perspective_matte 1.png"} alt="" /></span></li>

                <li class="slide-item"><span>Developed by Code94 Labs <img  src={"./assets/images/Flash_perspective_matte 1.png"} alt="" /></span></li>
                <li class="slide-item"><span>Developed by Code94 Labs <img  src={"./assets/images/Flash_perspective_matte 1.png"} alt="" /></span></li>
                <li class="slide-item"><span>Developed by Code94 Labs <img  src={"./assets/images/Flash_perspective_matte 1.png"} alt="" /></span></li>
              </ul>
            </div>
          </div>

        </div>

      </>
    );
}

export default Footer