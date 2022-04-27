import { useState } from "react";
import { Link } from "react-router-dom";
const NavBar = () => {

    // handling full screen in mobile view 
    const [icon, setIcon] = useState(false)
    const handleIcon = () => {
        if (icon === false) {
            setIcon(true)
        } else if (icon === true) {
            setIcon(false)
        }
    }
    return (
        <header>
            {/* modified bootstrap nav code according to design */}
            <nav id="navbar" className="navbar navbar-expand-lg fixed-top  ">
                <div className="container-fluid px-5">
                    <div className="toggler-nav">
                        <Link className="navbar-brand" to="/"><img src="./images/logonav.png" width="100" alt="" /></Link>
                        <button onClick={handleIcon} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            {icon ? <img width="18" className="close" src="./images/close.png" alt="" /> : <span className="navbar-toggler-icon"></span>}
                        </button>

                    </div>
                    <div className={` collapse navbar-collapse `} id="navbarSupportedContent">
                        <div className={`ms-auto ${icon ? "navTransition " : "go-up"} `}>
                            <ul className="navbar-nav ms-auto mb-lg-0 ">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>

                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/">About</Link>

                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/">NFTs</Link>

                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/">Charity</Link>

                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/blogs">Blog</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <button className={`discord-button ${icon ? "expanded-nav-btn" : "discord-button"}`}>
                        <span>
                            <img src='./images/discordIcon.svg' alt="" />
                            <span>Join Discord</span>
                        </span>
                    </button>
                </div>
            </nav>


        </header>
    );
}

export default NavBar