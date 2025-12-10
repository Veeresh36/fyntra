import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import style from '../pages/productdesc.module.css';
import { userCart } from '../components/addtocart';

import arrow from '../assets/arrow.png'

function ProductDesc() {
    const location = useLocation();
    const { state } = location;
    const { carthandler, alertMsg } = userCart();
    let navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [selectedImg, setSelectedImg] = useState(null);

    const getProsData = async () => {
        const response = await fetch(`http://localhost:5001/product/${state.product}`);
        const result = await response.json();
        if (response.status === 200) {
            setProduct(result);
            setSelectedImg(result.images?.[0]?.imgpath || "");
        }
    };

    // console.log("pstatus", product.pstatus);

    useEffect(() => {
        getProsData();
    }, []);

    if (!product) return <p className="text-center mt-5">Loading...</p>;

    return (
        <div className={`container-fluid mt-0 ${style.container}`} style={{ display: product.pstatus === -1 ? "none" : "block" }}>
            {alertMsg && (
                <div className={`alert alert-success text-center ${style.alertBox}`} role="alert">
                    {alertMsg}
                </div>
            )}

            <div className={`column ${style.card}`}>
                <Link className={style.back} to="/"><img src={arrow} className={style.arrow} alt="" /> <span className='d-lg-none'>{product.productname}</span></Link>
                <div className={`col-md-6 ${style.leftBox}`}>
                    <div className={style.imgGroup}>
                        {product.images?.map((img, index) => (
                            <img
                                key={index}
                                className={style.imgs}
                                src={`http://localhost:5001/upload/${img.imgpath}`}
                                alt={product.productname}
                                onClick={() => setSelectedImg(img.imgpath)}
                                style={{
                                    border: selectedImg === img.imgpath ? "2px solid #000" : "1px solid #ddd",
                                }}
                            />
                        ))}
                    </div>

                    <div className={style.hoveredImg}>
                        <img
                            src={`http://localhost:5001/upload/${selectedImg}`}
                            alt={product.productname}
                        />
                    </div>
                </div>

                <div className={style.rightBox}>
                    <div className={`p-1 ${style.info}`}>
                        <h2 className="fw-bold">{product.productname}</h2>
                        <h4 className="text-success mt-3">₹{product.price}</h4>
                        <p className="mt-3 text-muted">{product.descs}</p>

                        <div className="mt-4 d-flex gap-3">
                            {
                                product.pstatus === 0 ? <>
                                    <button
                                        className="btn btn-dark disabled"
                                        onClick={() => carthandler(product)}
                                    >
                                        Add to Cart
                                    </button>
                                    <button className='text-danger btn border border-3 border-danger disabled'>Out Of Stock</button>
                                </> : <>
                                    <button
                                        className="btn btn-dark"
                                        onClick={() => carthandler(product)}
                                    >
                                        Add to Cart
                                    </button>
                                    <button onClick={() => carthandler(product, navigate("/cart"))} className="btn btn-danger">Buy Now</button>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDesc;
