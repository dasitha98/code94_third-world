const FAQSection = () => {
  return (
    <>
      <section id="faq-sec">
        <div>
          <h1>Frequently Asked Questions</h1>
          <div class="accordion accordion-flush faq-questions" id="accordionFlushExample">
            <div class="accordion-item" id="accordion-item">
              <h2 class="accordion-header" id="flush-headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  What Makes The Third World NFTs Special?
                </button>
              </h2>
              <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body"><p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque delectus tempore nihil fugiat quaerat ipsum iste expedita, a perferendis exercitationem, consequatur dolores
                </p></div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                  What Is an NFT?
                </button>
              </h2>
              <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body"><p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque delectus tempore nihil fugiat quaerat ipsum iste expedita, a perferendis exercitationem, consequatur dolores placeat maxime, molestiae rem laborum n
                </p></div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                  What is Mint Price?
                </button>
              </h2>
              <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body"><p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque delectus tempore nihil fugiat quaerat ipsum iste expedita, a perferendis exercitationem, consequatur dolores placeat maxime, molestiae rem laborum nob
                </p></div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingFour">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                  What Is The Supply?
                </button>
              </h2>
              <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body"><p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque delectus tempore nihil fugiat quaerat ipsum iste expedita, a perferendis exercitationem, consequatur dolores placeat maxime, molestiae rem laborum no
                </p></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FAQSection