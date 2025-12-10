import React, { useEffect, useState } from 'react'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import style from '../components/navbar.module.css'
import { categories, allProducts } from '../config/config'
import { userCart } from '../components/addtocart'
import { getUserAddress, userDetails } from '../config/config'

import m1 from '../assets/header/mobile nav/m1.png'
import m2 from '../assets/header/mobile nav/m2.png'
import m3 from '../assets/header/mobile nav/m3.png'
import m4 from '../assets/header/mobile nav/m4.png'
import m5 from '../assets/header/mobile nav/m6.png'

import logo from '../../src/assets/logo/Fyntra.png'
import c12 from '../assets/header/categories icons/12.png'
import c13 from '../assets/header/categories icons/13.png'
import c14 from '../assets/header/categories icons/14.png'
import allpros from '../assets/header/categories icons/allps.apng'

function navbar({ setFillPros, fillpros, role }) {

    const [caties, setCaties] = useState([])
    const [products, setProducts] = useState([])
    const [address, setAddress] = useState([])
    const [user, setUser] = useState([])

    const [searchquery, setSearchQuery] = useState('')
    const [sortedPros, setSortedPros] = useState([])

    const navigate = useNavigate()

    // cart count update
    const { totalItems } = userCart();

    // Get all products
    const getproducts = async () => {
        let response = await allProducts()
        let result = await response
        setProducts(result)
    }

    // get address
    const userAddress = async () => {
        try {
            const response = await getUserAddress();
            // Ensure it's always an array
            if (Array.isArray(response)) {
                setAddress(response);
            } else {
                setAddress([]); // if no address or invalid data
            }
        } catch (error) {
            console.error("Error fetching address:", error);
            setAddress([]); // fallback if 404 or API error
        }
    };

    // user data geting
    const getUserData = async () => {
        let result = await userDetails();
        setUser(result);
    };

    // Filter products by category
    const filterByCategory = (catid) => {
        if (catid === 'All') {
            setFillPros(products)
        } else {
            let filtered = products.filter(p => p.catid === catid)
            setFillPros(filtered)
        }
    }

    // assigning the carts products response to hook
    const assionCats = async () => {
        let response = await categories()
        setCaties(response)
    }

    // SEARCH HANDLER
    const searchHandler = (e) => {
        const query = e.target.value.trim()
        setSearchQuery(query)

        if (!query) {
            setSortedPros([])
            return
        }

        // Filter products
        const filteredProducts = products.filter(p =>
            p.productname.toLowerCase().includes(query.toLowerCase())
        )

        // Filter categories
        const filteredCategories = caties.filter(c =>
            c.catname.toLowerCase().includes(query.toLowerCase())
        )

        // Combine both results
        const combinedResults = [
            ...filteredCategories.map(c => ({ ...c, type: 'category' })),
            ...filteredProducts.map(p => ({ ...p, type: 'product' }))
        ]

        setSortedPros(combinedResults)
    }

    // CLICK ON SEARCH RESULT
    const resultHandler = (item) => {
        setSearchQuery('');
        setSortedPros([]);

        if (item.type === 'product') {
            setFillPros([item]);
            navigate(`/product`, { state: { product: item.Productid } });
        } else if (item.type === 'category') {
            filterByCategory(item.catid);
            navigate(item.rout);
        }
    };


    console.log(sortedPros);

    // On mount
    useEffect(() => {
        assionCats()
        userAddress()
        getUserData()
        getproducts()
    }, [])

    return (
        <>
            <div className={` d-none d-lg-block ${style.navbars}`}>
                <nav className={`navbar navbar-expand-lg navbar-dark ${style.navbar}`}>
                    {!role && (
                        <div className={`navbar ${style.mainNavbar}`} id="navbarNav">

                            <ul className={`navbar-nav ${style.allLinks}`}>
                                <div className="logobox">
                                    <Link className={`navbar-brand d-block ${style.logocontainr}`} to="/">
                                        <img src={logo} className={style.logo} alt="" />
                                    </Link>
                                </div>
                                <li>
                                    <div className={style.mainlocation}>
                                        <span className={style.locWithIcon}>
                                            <img className={style.location} src={c12} alt="" />
                                            <span className={style.custLoc}>select your location</span>
                                        </span>
                                        <Link to='' className={`nav-link text-light ${style.updateLoc}`}>Update Location

                                            <Link to='/login' className={`nav-link text-light ${style.updateLocLogin}`}>login
                                            </Link>
                                        </Link>


                                    </div>
                                </li>

                                <li>
                                    <div className={style.search}>
                                        {/* category displaying in first Nav */}
                                        <select name="catoguries" onChange={(e) => {
                                            const route = e.target.value;
                                            if (route === "") {
                                                // when "All" selected
                                                filterByCategory("All");
                                                navigate("/allp");
                                            } else {
                                                navigate(route);
                                                const selectedCat = caties.find(c => c.rout === route);
                                                if (selectedCat) filterByCategory(selectedCat.catid);
                                            }
                                        }} id="">
                                            <option value="" selected disabled >Home</option>
                                            <option value="" >All</option>
                                            {caties.map((drop) => (
                                                <option value={drop.rout}>
                                                    {drop.catname}
                                                </option>
                                            ))}
                                        </select>
                                        <input type="search" value={searchquery} onChange={searchHandler} placeholder='Looking for something special... ?' />
                                        <img src={c13} className={style.serhIcon} alt="" />
                                    </div>
                                    <div className={style.searchResults}>
                                        {searchquery && (
                                            sortedPros.length === 0 ? (
                                                <span className={`${style.searchProducts} text-danger`}>No results found</span>
                                            ) : (
                                                sortedPros.map(item => (
                                                    <span
                                                        onClick={() => resultHandler(item)}
                                                        key={item.type === 'category' ? item.catid : item.Productid || item.id}
                                                        className={style.searchProducts}
                                                    >
                                                        {item.type === 'category' ? `Category: ${item.catname}` : item.productname}
                                                    </span>
                                                ))
                                            )
                                        )}
                                    </div>
                                </li>

                                <li className={`rightBox ${style.signup}`}>
                                    <Link className={`nav-link text-light ${style.comeIn}`} to="/login">signin</Link>
                                </li>
                                <li className={`rightBox ${style.cartmain}`}>
                                    <Link className={`nav-link text-light ${style.carticon}`} to="/cart">
                                        <span>
                                            <img src={c14} alt="" />
                                            {totalItems === 0 ? <span className="translate-middle badge"
                                                style={{ width: "18px", fontSize: '0.7rem', position: "absolute", top: "13px", right: "-1px", color: "#fff", background: "#ff0000ff", padding: "2px 3px" }}>0</span> : totalItems > 0 && (
                                                    <span className="translate-middle badge"
                                                        style={{ width: "18px", fontSize: '0.7rem', position: "absolute", top: "13px", right: "-1px", color: "#fff", background: "#ff0000ff", padding: "2px 3px" }}
                                                    >
                                                        {totalItems}
                                                    </span>
                                                )}
                                            <span className={style.cartword}>cart</span>
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}

                    {role === 'user' && (
                        <div className={`navbar ${style.mainNavbar}`} id="navbarNav">

                            <ul className={`navbar-nav ${style.allLinks}`}>
                                <div className="logobox">
                                    <Link className={`navbar-brand d-block ${style.logocontainr}`} to="/">
                                        <img src={logo} className={style.logo} alt="" />
                                    </Link>
                                </div>
                                <li>
                                    <div className={style.mainlocation}>
                                        <span className={style.locWithIcon}>
                                            <img className={style.location} src={c12} alt="" />
                                            {
                                                address.length === 0 ? (
                                                    <span className={style.custLoc}>Current Location</span>
                                                ) : (
                                                    address.map(item => (
                                                        <span key={item.addressid} className={style.custLoc}>
                                                            {item.street}
                                                        </span>
                                                    ))
                                                )
                                            }

                                        </span>
                                        <Link to='/' className={`nav-link text-light ${style.updateLoc}`}>Update Location</Link>
                                    </div>
                                </li>

                                <li>
                                    <div className={style.search}>
                                        {/* category displaying in first Nav */}
                                        <select name="catoguries" onChange={(e) => {
                                            const route = e.target.value;
                                            if (route === "") {
                                                // when "All" selected
                                                filterByCategory("All");
                                                navigate("/allp");
                                            } else {
                                                navigate(route);
                                                const selectedCat = caties.find(c => c.rout === route);
                                                if (selectedCat) filterByCategory(selectedCat.catid);
                                            }
                                        }} id="">
                                            <option value="" selected disabled >Home</option>
                                            <option value="" >All</option>
                                            {caties.map((drop) => (
                                                <option value={drop.rout}>
                                                    {drop.catname}
                                                </option>
                                            ))}
                                        </select>
                                        <input type="search" value={searchquery} onChange={searchHandler} placeholder='Looking for something special... ?' />
                                        <img src={c13} className={style.serhIcon} alt="" />
                                    </div>
                                    <div className={style.searchResults}>
                                        {searchquery && (
                                            sortedPros.length === 0 ? (
                                                <span className={`${style.searchProducts} text-danger`}>No results found</span>
                                            ) : (
                                                sortedPros.map(item => (
                                                    <span
                                                        onClick={() => resultHandler(item)}
                                                        key={item.type === 'category' ? item.catid : item.Productid || item.id}
                                                        className={style.searchProducts}
                                                    >
                                                        {item.type === 'category' ? `Category: ${item.catname}` : item.productname}
                                                    </span>
                                                ))
                                            )
                                        )}
                                    </div>
                                </li>

                                <li className={`${style.signup} ${style.dropdown}`}>
                                    <span className={`nav-link text-light ${style.comeIn}`}>
                                        {user[0]?.firstName}
                                    </span>
                                    <ul className={style.dropdownMenu}>
                                        <li><Link to="/users">Profile</Link></li>
                                        <li><Link to="/userorders">Orders</Link></li>
                                        <li><Link onClick={() => {
                                            localStorage.removeItem('token')
                                            localStorage.removeItem('role')
                                            navigate('/')
                                            window.location.reload();
                                        }}>Logout</Link></li>
                                    </ul>
                                </li>

                                <li className={`rightBox ${style.cartmain}`}>
                                    <Link className={`nav-link text-light ${style.carticon}`} to="/cart">
                                        <span>
                                            <img src={c14} alt="" />
                                            {totalItems === 0 ? <span className="translate-middle badge"
                                                style={{ width: "18px", fontSize: '0.7rem', position: "absolute", top: "13px", right: "-1px", color: "#fff", background: "#ff0000ff", padding: "2px 3px" }}>0</span> : totalItems > 0 && (
                                                    <span className="translate-middle badge"
                                                        style={{ width: "18px", fontSize: '0.7rem', position: "absolute", top: "13px", right: "-1px", color: "#fff", background: "#ff0000ff", padding: "2px 3px" }}
                                                    >
                                                        {totalItems}
                                                    </span>
                                                )}
                                            <span className={style.cartword}>cart</span>
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}

                    {role === 'admin' && (
                        <div className={`navbar ${style.mainNavbar}`} id="navbarNav">

                            <ul className={`navbar-nav ${style.allLinks}`}>
                                <div className="logobox">
                                    <Link className={`navbar-brand d-block ${style.logocontainr}`} to="/">
                                        <img src={logo} className={style.logo} alt="" />
                                    </Link>
                                </div>
                                <li>
                                    <div className={style.mainlocation}>
                                        <span className={style.locWithIcon}>
                                            <img className={style.location} src={c12} alt="" />
                                            {
                                                address.length === 0 ? (
                                                    <span className={style.custLoc}>Current Location</span>
                                                ) : (
                                                    address.map(item => (
                                                        <span key={item.addressid} className={style.custLoc}>
                                                            {item.street}
                                                        </span>
                                                    ))
                                                )
                                            }

                                        </span>
                                        <Link to='' className={`nav-link text-light ${style.updateLoc}`}>Update Location


                                        </Link>
                                    </div>
                                </li>

                                <li>
                                    <div className={style.search}>
                                        {/* category displaying in first Nav */}
                                        <select name="catoguries" onChange={(e) => {
                                            const route = e.target.value;
                                            if (route === "") {
                                                // when "All" selected
                                                filterByCategory("All");
                                                navigate("/allp");
                                            } else {
                                                navigate(route);
                                                const selectedCat = caties.find(c => c.rout === route);
                                                if (selectedCat) filterByCategory(selectedCat.catid);
                                            }
                                        }} id="">
                                            <option value="" selected disabled >Home</option>
                                            <option value="" >All</option>
                                            {caties.map((drop) => (
                                                <option value={drop.rout}>
                                                    {drop.catname}
                                                </option>
                                            ))}
                                        </select>
                                        <input type="search" value={searchquery} onChange={searchHandler} placeholder='Looking for something special... ?' />
                                        <img src={c13} className={style.serhIcon} alt="" />
                                    </div>
                                    <div className={style.searchResults}>
                                        {searchquery && (
                                            sortedPros.length === 0 ? (
                                                <span className={`${style.searchProducts} text-danger`}>No results found</span>
                                            ) : (
                                                sortedPros.map(item => (
                                                    <span
                                                        onClick={() => resultHandler(item)}
                                                        key={item.type === 'category' ? item.catid : item.Productid || item.id}
                                                        className={style.searchProducts}
                                                    >
                                                        {item.type === 'category' ? `Category: ${item.catname}` : item.productname}
                                                    </span>
                                                ))
                                            )
                                        )}
                                    </div>

                                </li>

                                <li className={`${style.signup} ${style.dropdown}`}>
                                    <span className={`nav-link text-light ${style.comeIn}`}>
                                        {user[0]?.firstName}
                                    </span>
                                    <ul className={style.dropdownMenu}>
                                        <li><Link to="/users">Profile</Link></li>
                                        <li><Link to="/userorders">Orders</Link></li>
                                        <li><Link onClick={() => {
                                            localStorage.removeItem('token')
                                            localStorage.removeItem('role')
                                            navigate('/')
                                            window.location.reload();
                                        }}>Logout</Link></li>
                                    </ul>
                                </li>

                                <li className={`rightBox ${style.cartmain}`}>
                                    <Link className={`nav-link text-light ${style.carticon}`} to="/cart">
                                        <span>
                                            <img src={c14} alt="" />
                                            {totalItems === 0 ? <span className="translate-middle badge"
                                                style={{ width: "18px", fontSize: '0.7rem', position: "absolute", top: "13px", right: "-1px", color: "#fff", background: "#ff0000ff", padding: "2px 3px" }}>0</span> : totalItems > 0 && (
                                                    <span className="translate-middle badge"
                                                        style={{ width: "18px", fontSize: '0.7rem', position: "absolute", top: "13px", right: "-1px", color: "#fff", background: "#ff0000ff", padding: "2px 3px" }}
                                                    >
                                                        {totalItems}
                                                    </span>
                                                )}
                                            <span className={style.cartword}>cart</span>
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </nav>

                {/* categouries */}
                <nav className={`navbar navbar-expand-lg navbar-dark ${style.navbar2}`}>
                    <div className="container-fluid">

                        <div className="navbar-collapse" id="navbarNav2">
                            {/* category displaying in first Nav */}
                            <ul className={`navbar-nav ${style.catgories}`}>
                                <Link className={`${style.AllprosLink}`} to="/allp"><img src={allpros} className={style.allcaticon} alt="all products" />All</Link>
                                {
                                    caties.map(drop =>
                                        <>
                                            <li className={`nav-item${style.navLinks}`} key={drop.id} onClick={() => filterByCategory(drop.catid)}>
                                                <Link className={`nav-link text-light active ${style.catLinks}`} aria-current="page" to={drop.rout}><img className={`${style.cimg}`} src={`./src/assets/header/categories icons/${drop.imgpath}`} alt="" />{drop.catname}</Link>
                                            </li>
                                        </>
                                    )
                                }

                            </ul>
                        </div>
                    </div>
                </nav>
            </div>


            <div className={`${style.mobileNav} d-lg-none `}>
                <div className={style.search}>
                    <input type="search" value={searchquery} onChange={searchHandler} placeholder='Looking for something special... ?' />
                    <img src={c13} className={style.serhIcon} alt="" />
                </div>
                <div className={style.searchResults}>
                    {searchquery && (
                        sortedPros.length === 0 ? (
                            <span className={`${style.searchProducts} text-danger`}>No results found</span>
                        ) : (
                            sortedPros.map(item => (
                                <span
                                    onClick={() => resultHandler(item)}
                                    key={item.type === 'category' ? item.catid : item.Productid || item.id}
                                    className={style.searchProducts}
                                >
                                    {item.type === 'category' ? `Category: ${item.catname}` : item.productname}
                                </span>
                            ))
                        )
                    )}
                </div>
                <div className={style.mobNav}>
                    <nav className={`navbar fixed-bottom navbar-dark justify-content-around ${style.mobLinks}`}>
                        <ul>
                            <li><NavLink to='/'><img src={m1} alt="mobileNav Icons" /></NavLink></li>
                            <li><NavLink to='/addps'><img src={m3} alt="mobileNav Icons" /></NavLink></li>
                            <li><NavLink to='/login'><img src={m5} alt="mobileNav Icons" /></NavLink></li>
                            <li><NavLink to='/users'><img src={m2} alt="mobileNav Icons" /></NavLink></li>
                            <li><NavLink to='/cart'><img src={m4} alt="mobileNav Icons" /></NavLink></li>
                        </ul>
                    </nav>
                </div>

                {role === "user" && (
                    <div className={`${style.mobNav}`}>
                        <nav className={`navbar fixed-bottom navbar-dark justify-content-around ${style.mobLinks}`}>
                            <ul >
                                <li><NavLink to='/'><img src={m1} alt="mobileNav Icons" /></NavLink></li>
                                <li><NavLink to='/addps'><img src={m3} alt="mobileNav Icons" /></NavLink></li>
                                <li><NavLink to='/userorders'><img src={m5} alt="mobileNav Icons" /></NavLink></li>
                                <li><NavLink to='/users'><img src={m2} alt="mobileNav Icons" /></NavLink></li>
                                <li><NavLink to='/cart'><img src={m4} alt="mobileNav Icons" /></NavLink></li>
                            </ul>
                        </nav>
                    </div>
                )}
            </div>
        </>
    )
}

export default navbar
