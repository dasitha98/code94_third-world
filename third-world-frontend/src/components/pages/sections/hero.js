import React, { useEffect, useState } from "react";

const HeroSection = () => {


    const [timerDays, setTimerDays] = useState();
    const [timerHours, setTimerHours] = useState();
    const [timerMinutes, setTimerMinutes] = useState();
    const [timerSeconds, setTimerSeconds] = useState();

    let interval;
    const startTimer = () => {
        const countDownDate = new Date("March 28,2022 ").getTime();
        interval = setInterval(() => {
            const now = new Date().getTime();

            const distance = countDownDate - now;

            const days = Math.floor(distance / (24 * 60 * 60 * 1000));
            const hours = Math.floor(distance % (24 * 60 * 60 * 1000) / (1000 * 60 * 60));
            const minutes = Math.floor(distance % (60 * 60 * 1000) / (1000 * 60));
            const seconds = Math.floor(distance % (60 * 1000) / 1000);

            if (distance < 0) {
                clearInterval(interval.current);
            } else {

                setTimerDays(days);
                setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);


            }


        })
    }

    useEffect(() => {
        startTimer();
    });


    return (
        <>
            <section>
                {/* <div className="jumbotron">
                <div className="hero-boy"></div>
                <div className="hero-girl"></div>
                <div className="lead"><p className="hero-text">A world with equality, love, peace & conscious minded humans</p></div>
                <div className="hero-timer">
                        <div className="clock">
                            <section>
                                <p>{timerDays}</p>
                                <small>Days</small>
                            </section>
                            <section>
                                <p>{timerHours}</p>
                                <small>Hours</small>
                            </section>
                            <section>
                                <p>{timerMinutes}</p>
                                <small>Minutes</small>
                            </section>
                            <section>
                                <p>{timerSeconds}</p>
                                <small>Seconds</small>
                            </section>
                        </div>
                    </div>
            </div> */}


                <div className="heroSec-wrapper">
                    <div className="d-flex flex-lg-row-reverse justify-content-around align-items-center">
                        <div>
                            <h1 >A world with equality, love,<br /> peace & conscious minded <br /> humans</h1>
                            <div className="countdown-wrapper">
                                <div>
                                    <div className="d-flex justify-content-evenly align-items-center">
                                        <div >
                                            <p >{timerDays}</p>
                                            <small>Days</small>
                                        </div>
                                        <div className="">
                                            <p >{timerHours}</p>
                                            <small>Hours</small>
                                        </div>
                                        <div >
                                            <p >{timerMinutes}</p>
                                            <small>Minutes</small>
                                        </div>
                                        <div className="">
                                            <p >{timerSeconds}</p>
                                            <small>Seconds</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <div className="hero-img">
                                <img src="./assets/images/Group 197.png" alt="Bootstrap Themes" width="600" loading="lazy" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default HeroSection