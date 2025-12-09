import React from 'react'
import style from '../components/footer.module.css'
import { Link } from 'react-router-dom'

import f1 from '../assets/footer/f1.png'
import i1 from '../assets/footer/i1.png'
import t1 from '../assets/footer/t1.png'
import y1 from '../assets/footer/y1.png'

function footer() {
    return (
        <div >
            <div className={` ${style.footer}`}>
                <div className={style.links}>
                    <ul>
                        <h3>Customer Support</h3>
                        <li><Link>Security</Link></li>
                        <li><Link>Terms of Use</Link></li>
                        <li><Link>Cancellation and Returns</Link></li>
                        <li><Link>Contact Us</Link></li>
                        <li><Link>Privacy</Link></li>
                    </ul>
                    <ul>
                        <h3>Quick Links</h3>
                        <li><Link>Security</Link></li>
                        <li><Link>FAQs</Link></li>
                    </ul>
                    <ul>
                        <h3>Address</h3>
                        <li><Link>#63/1 14<sup>th</sup> cross <br /> near Police Station Navanagar <br />Hubballi - 580025 </Link></li>
                    </ul>
                    <ul>
                        <h3>Email id</h3>
                        <a href="mailto:Veereshbashetti0.1@gmail.com">fyntraofficial@gmail.com</a>
                    </ul>
                    <ul className={style.socialmedia}>
                        <h3>Social Media</h3>
                        <li>
                            <Link to="/notfound" target='blank'><img src={f1} alt="" /></Link>
                            <Link to="/notfound" target='blank' ><img src={i1} alt="" /></Link>
                            <Link to="/notfound" target='blank' ><img src={t1} alt="" /></Link>
                            <Link to="/notfound" target='blank' ><img src={y1} alt="" /></Link>
                        </li>
                    </ul>

                    <h1 className={style.logo}>FYNTRA</h1>
                </div>

                <p>© 2025 Fyntra. All rights reserved.</p>
            </div>
        </div >
    )
}

export default footer