const JoinTheCommunitySection = () => {
    return (
      <>
          <section>
              {/* section for join the community */}
              <div class="p-5 bg-orange text-white rounded">
                <div class="container text-dark">
                  <div class="row">
                    <div class="col-md-6 row align-items-center order-2 order-md-2">
                      <div class="align-middle">
                        <h1>Join The Community</h1>
                        <p>Above everything, we’re community first. Come join our fast growing Discord community to stay up to date with our latest announcements and make new friends!</p>
                        <button className="we-are-transparent-button ">
                          <span>
                              <img src='./images/discordIcon.svg' alt="" />
                              <span>Join Discord</span>
                          </span>
                        </button> 
                      </div>
                    </div>
                    <div class="col-md-6 text-center order-1 order-md-1">
                      <img class="img-fluid float" src="./assets/img/Heart_rate.png" />
                    </div>
                  </div>
                </div>
              </div>
          </section>
      </>
    );
  }
  
  export default JoinTheCommunitySection