import React, { useState, useEffect } from 'react';
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import decode from 'jwt-decode'

import { useDispatch } from 'react-redux';
import { getUserData } from '../../actions/auth';
import { getComapnyLogo } from '../../actions/common';

import { ReactComponent as DashboardSVG } from '../../assets/icons/dashboard.svg';
import { ReactComponent as CategoriesSVG } from '../../assets/icons/categories.svg';
import { ReactComponent as ProductsSVG } from '../../assets/icons/products.svg';
import { ReactComponent as SettingsSVG } from '../../assets/icons/settings.svg';

const MainLayout = (props) => {
    const history = useHistory();
    const [decodedToken, setDecodedToken] = useState('')
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();


    const logout = () => {
        dispatch({ type: "LOGOUT" });
        history.push('/auth/login');
        setUser(null);
    };

    useEffect(() => {
        // dispatch(getUserData())
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            setDecodedToken(decodedToken)
            if (decodedToken.exp * 6000 < new Date().getTime()) logout();
        } else {
            history.push('/auth/login');
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <>
            <header class="header bg-body">
                <nav class="navbar flex-nowrap p-0" style={{ backgroundColor: "white" }}>
                    <div class="navbar-brand-wrapper d-flex align-items-center col-auto">

                        <a class="navbar-brand navbar-brand-mobile" href="/">
                            <img class="img-fluid w-100" src="/documentation/assets/img/logo-mini.png" alt="Graindashboard" />
                        </a>

                        <a class="navbar-brand navbar-brand-desktop" href="/">
                            <img class="side-nav-show-on-closed" src="/documentation/assets/img/logo-mini.png" alt="Graindashboard"
                                style={{ width: "auto", height: 60 }} />
                            <img class="side-nav-hide-on-closed" src="/documentation/assets/img/logo-mini.png" alt="Graindashboard"
                                style={{ width: "auto", height: 60 }} />
                        </a>

                    </div>

                    <div class="header-content col px-md-3">
                        <div class="d-flex align-items-center">

                            <div class="dropdown mx-3 ml-auto dropdown">
                                <a id="profileMenuInvoker" class="header-complex-invoker" href="javascript:void(0)" aria-controls="profileMenu"
                                    aria-haspopup="true" aria-expanded="false" data-unfold-event="click"
                                    data-unfold-target="#profileMenu" data-unfold-type="css-animation"
                                    data-unfold-duration="300" data-unfold-animation-in="fadeIn"
                                    data-unfold-animation-out="fadeOut">

                                    <span class="mr-md-2">
                                        <i class="gd-user"></i>
                                    </span>
                                    <span class="d-none d-md-block">{user && user.result.name}</span>
                                    <i class="gd-angle-down d-none d-md-block ml-2"></i>
                                </a>

                                <ul id="profileMenu"
                                    class="unfold unfold-user unfold-light unfold-top unfold-centered position-absolute pt-2 pb-1 mt-4 unfold-css-animation unfold-hidden fadeOut"
                                    aria-labelledby="profileMenuInvoker" style={{ animationDuration: "300ms" }}>
                                    <li class="unfold-item">
                                        <Link to="/settings">
                                            <a class="unfold-link d-flex align-items-center text-nowrap">
                                                <span class="unfold-item-icon mr-3">
                                                    <i class="gd-user"></i>
                                                </span>
                                                My Profile
                                            </a>
                                        </Link>
                                    </li>
                                    <li class="unfold-item unfold-item-has-divider">
                                        <Link to="/auth/logout">
                                            <a class="unfold-link d-flex align-items-center text-nowrap">
                                                <span class="unfold-item-icon mr-3">
                                                    <i class="gd-power-off"></i>
                                                </span>
                                                Sign Out
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </nav>
            </header>

            <main class="main">
                <aside id="sidebar" class="js-custom-scroll side-nav" style={{ backgroundColor: "#f7f7f7" }}>
                    <ul id="sideNav" class="side-nav-menu side-nav-menu-top-level mb-0 text-center">

                        <li class="side-nav-menu-item">
                            <Link to="/">
                                <a class="navbar-brand navbar-brand-mobile" href="/">
                                    <img class="img-fluid w-100" src="/documentation/assets/img/logo-mini.png" alt="Graindashboard" />
                                </a>

                                <a class="navbar-brand navbar-brand-desktop" href="/">
                                    <img class="side-nav-show-on-closed mx-auto" src="/documentation/assets/img/logo-mini.png" alt="Graindashboard"
                                        style={{ width: "auto", height: 80 }} />
                                    <img class="side-nav-hide-on-closed mx-auto" src="/documentation/assets/img/logo-mini.png" alt="Graindashboard"
                                        style={{ width: "auto", height: 80 }} />
                                </a>
                            </Link>
                        </li>

                        <li class="sidebar-heading h6"></li>

                        <li className={location.pathname === '/blogs' ? 'side-bar-item side-bar-item-active' : 'side-bar-item'}>
                            <Link to="/blogs" className='nav-link py-3 border-bottom h5'>
                                <span class="unfold-item-icon mr-3">
                                    <i class="gd-clipboard"></i>
                                </span> <span>BLOGS</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/audits' ? 'side-bar-item side-bar-item-active' : 'side-bar-item'}>
                            <Link to="/audits" className='nav-link py-3 border-bottom h5'>
                                <span class="unfold-item-icon mr-3">
                                    <i class="gd-agenda"></i>
                                </span>
                                <span>AUDITS</span>
                            </Link>
                        </li>
                        <li className={location.pathname === '/settings' ? 'side-bar-item side-bar-item-active' : 'side-bar-item'}>
                            <Link to="/settings" className='nav-link py-3 border-bottom h5'>
                                <span class="unfold-item-icon mr-2">
                                    <i class="gd-settings"></i>
                                </span> <span>SETTINGS</span>
                            </Link>
                        </li>

                    </ul>

                </aside>

                <div class="content vh-100">
                    {props.children}

                    {/* footer */}
                    <footer class="small p-3 px-md-4 mt-auto">
                        <div class="row justify-content-between">
                            <div class="col-lg text-center text-lg-left mb-3 mb-lg-0">
                                <ul class="list-dot list-inline mb-0">
                                    <li class="list-dot-item list-dot-item-not list-inline-item mr-lg-2"><a class="link-dark"
                                        href="http://www.thirdworld.io/" target="_blank" >thirdworld.io</a></li>
                                </ul>
                            </div>

                            <div class="col-lg text-center text-lg-right">
                                &copy; Third world. All Rights Reserved.
                            </div>
                        </div>
                    </footer>
                </div>
            </main>
        </>

    );
}

export default MainLayout;