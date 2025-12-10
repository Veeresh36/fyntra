import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../pages/profile.module.css';
import img1 from '../assets/about pers.jpeg';
import Forgot from '../components/forgot'
import UserInfo from '../pages/userinfo'

function PofileUser() {
    const navigate = useNavigate();

    const [activeSection, setActiveSection] = useState("profile");

    const imgs = [{ imglink: img1 }];

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    useEffect(() => {
        if (!token || role !== 'user') {
            navigate("/login");
        }
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/');
        window.location.reload();
    };

    return (
        <>
            <div className={style.container}>

                {/* RIGHT SIDEBAR */}
                <div className={style.rightBox}>
                    <div className={style.profileMenu}>

                        {/* Profile Image */}
                        <div className={`${style.profileImgBox} d-none d-lg-block`}>
                            {imgs.map((img, index) => (
                                <img
                                    key={index}
                                    src={img.imglink}
                                    className={`${style.profileImg}`}
                                    alt="Profile"
                                />
                            ))}
                        </div>

                        {/* MENU */}
                        <ul>
                            <li
                                className={`${style.navItems} ${activeSection === 'profile' ? style.active : ''}`}
                                onClick={() => setActiveSection("profile")}
                            >
                                Profile
                            </li>

                            <li
                                className={`${style.navItems} ${activeSection === 'password' ? style.active : ''}`}
                                onClick={() => setActiveSection("password")}
                            >
                                Change Password
                            </li>

                            <li
                                className={style.logout}
                                onClick={logoutHandler}
                            >
                                Logout
                            </li>
                        </ul>
                    </div>
                </div>

                {/* LEFT CONTENT AREA */}
                <div className={style.leftBox}>
                    {activeSection === "profile" && (
                        <div>
                            <UserInfo />
                        </div>
                    )}

                    {activeSection === "password" && (
                        <div>
                            <Forgot />
                        </div>
                    )}
                </div>

            </div>
        </>
    );
}

export default PofileUser;
