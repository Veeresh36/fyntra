import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom"
import { categories } from '../config/config'
import Navbar from "../components/navbar"
import Home from '../pages/home'
import Citylist from '../components/citieslist'
import Register from '../pages/Register'
import Login from '../pages/login'
import Otpverify from '../components/otpVerify'
import Forgot from '../components/forgot'
import PofileUser from '../../src/pages/pofileUser'
import Admin from '../pages/admin/adminlogin'
import Dashbord from '../pages/admin/dashbord'
import Dropzone from '../components/dropZone'
import AllPs from '../pages/allproduct'
import Cart from '../pages/cart'
import Homepros from '../pages/homepros'
import Prodescripion from '../pages/productdesc'
import Addtocart from '../components/addtocart'
import NotFound from '../components/notfound'
import CashOn from '../components/cashOn'
import OnlinePay from '../components/onlinePay'
import Orders from '../pages/orderItems'
import Adminorders from '../pages/admin/orders'
import Footer from '../components/footer'
import Managepros from '../pages/admin/managepros'
import Ratings from '../components/ratings'
import Userinfo from '../pages/userinfo'
import CatesLints from '../components/categourisList'

// cats
import Cloths from '../../src/pages/cats/Cloths'
import Best from '../pages/cats/bestsalling'
import Elec from '../../src/pages/cats/electronics'
import Game from '../../src/pages/cats/gaming'
import Homekit from '../../src/pages/cats/homekit'
import Laptop from '../../src/pages/cats/laptop'
import Mobile from '../../src/pages/cats/mobile'
import Shoes from '../../src/pages/cats/shoes'
import Toys from '../../src/pages/cats/toys'
import Books from '../../src/pages/cats/books'

//add product
import Addps from '../pages/admin/addps'
import Sidebar from '../pages/admin/sidemenu'
import EditProduct from '../pages/admin/EditProduct'


function Layout() {
    const [cates, setCates] = useState([])
    const [prods, setProds] = useState([])
    const [fillpros, setFillPros] = useState(() => {
        // Restore from localStorage on reload
        const saved = localStorage.getItem("fillpros");
        return saved ? JSON.parse(saved) : [];
    });
    const [orderItems, setOrderItems] = useState([])
    const [role, setRole] = useState(localStorage.getItem('role'));

    let updateRole = (role) => {
        setRole(role);
        if (role) {
            localStorage.setItem("role", role)
        } else {
            localStorage.removeItem("role");
        }
    }

    console.log("for ratings", prods);


    useEffect(() => {
        localStorage.setItem("fillpros", JSON.stringify(fillpros));
    }, [fillpros]);

    const location = useLocation();

    // Hide navbars from this routes
    const hideNavbarRoutes = ["/login", "/signup", "/otp", "/forgot", "/admin", "/dashbord", "/maindash", "/addps", "/notfound", "/Orders", "/footer", "/manageProducts", '/ratings', '/userinfo', "/editproducts/:id", "/categouries"];
    const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

    // Hide footers from this routes
    const hideFooterRoutes = ["/login", "/signup", "/otp", "/forgot", "/admin", "/dashbord", "/maindash", "/addps", "/notfound", "/Orders", "/footer", "/cart", "/manageProducts", "/users", '/ratings', '/userinfo', "/editproducts/:id", "/categouries"];
    const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

    let getCates = async () => {
        let response = await categories()
        setCates(response)
    }

    console.log("from app.jsx", orderItems);

    setTimeout(() => {
        localStorage.removeItem(token)
        localStorage.removeItem(role)
    }, 3600000);

    useEffect(() => {
        getCates()
    }, [])

    return (
        <>
            {!shouldHideNavbar && <Navbar role={role} setCates={setCates} fillpros={fillpros} setFillPros={setFillPros} />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cities" element={<Citylist />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/login" element={<Login updateRole={updateRole} />} />
                <Route path="/otp" element={<Otpverify />} />
                <Route path="/forgot" element={<Forgot />} />
                <Route path="/users" element={<PofileUser />} />
                <Route path="/drop" element={<Dropzone />} />
                <Route path="/allp" element={<AllPs setProds={setProds} />} />
                <Route path="/product" element={<Prodescripion prods={prods} />} />
                <Route path="/hpros" element={<Homepros />} />
                <Route path="/cart" element={<Cart setOrderItems={setOrderItems} />} />
                <Route path="/addcs" element={<Addtocart />} />
                <Route path="*" element={<Navigate to="/notfound" />} />
                <Route path="/notfound" element={<NotFound />} />
                <Route path="/cashondely" element={<CashOn orderItems={orderItems} />} />
                <Route path="/Onlinepay" element={<OnlinePay />} />
                <Route path="/userorders" element={<Orders />} />
                <Route path="/ratings" element={<Ratings prods={prods} />} />
                <Route path="/userinfo" element={<Userinfo />} />
                <Route path="/editproducts/:id" element={<EditProduct />} />


                {/* categouries */}
                <Route path="/Fashion" element={<Cloths fillpros={fillpros} />} />
                <Route path="/Trending" element={<Best fillpros={fillpros} />} />
                <Route path="/E&K" element={<Elec fillpros={fillpros} />} />
                <Route path="/Gadgets" element={<Game fillpros={fillpros} />} />
                <Route path="/Kitchen" element={<Homekit fillpros={fillpros} />} />
                <Route path="/Laptops" element={<Laptop fillpros={fillpros} />} />
                <Route path="/mobile" element={<Mobile fillpros={fillpros} />} />
                <Route path="/Shoes" element={<Shoes fillpros={fillpros} />} />
                <Route path="/BabyProducts" element={<Toys fillpros={fillpros} />} />
                <Route path="/Stationery" element={<Books fillpros={fillpros} />} />
                <Route path="/beauty" element={<Books fillpros={fillpros} />} />
                <Route path="/categouries" element={<CatesLints />} />

                {/* admin */}
                <Route path="/addps" element={<AdminLayout><Addps cates={cates} /></AdminLayout>} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/dashbord" element={<Dashbord />} />
                <Route path="/Orders" element={<Adminorders />} />
                <Route path="/manageProducts" element={<Managepros />} />

            </Routes>
            {!shouldHideFooter && <Footer />}
        </>
    );
}

const AdminLayout = ({ children }) => {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6 bg-gray-100 min-h-screen">{children}</main>
        </div>
    );
};


export default function AppRouter() {
    return (
        <Router>
            <Layout />
        </Router>
    );
}


