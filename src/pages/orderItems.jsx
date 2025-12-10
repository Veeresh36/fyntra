import React, { useState, useEffect } from 'react';
import { getOrderDetails } from '../config/config';
import style from '../pages/orderItem.module.css';
import Ratings from '../components/ratings';
import { useNavigate } from 'react-router-dom'

function OrderItems() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    let navigate = useNavigate()

    console.log("Orders:", orders);



    // Fetch Orders
    const fetchOrders = async () => {
        try {
            const result = await getOrderDetails();
            setOrders(result);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    console.log(orders);


    let ratingBtnHandler = (productid) => {
        console.log("Clicked productid:", productid); // This should show the correct id
        navigate("/ratings", { state: { productid } }); // send productid to next page
    };


    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) return <p className="text-center mt-4">Loading...</p>;
    if (orders.length === 0) return <p className="text-center mt-4">No orders found</p>;

    return (
        <div className={`container ${style.container}`}>
            <h1 className="text-center mt-3">Order Items</h1>
            <div className={style.bottom}>
                {orders.map((order) => {
                    const payment = Number(order.paymentmethod) === 1 ? "COD" : "Online";
                    return (
                        <div
                            className={style.subContainer}
                            key={`${order.orderId}-${order.productname}`}
                        >
                            <div className={style.card}>
                                <img
                                    className={style.orderImg}
                                    src={`http://localhost:5001/upload/${order.productImg}`}
                                    alt={order.productname}
                                />

                                <div className={style.body}>
                                    <p>Order ID: {(Number(order.orderId) + 485965).toString().slice(-5)}</p>
                                    <p>Product: {order.productname}</p>

                                    <div className={style.QP}>
                                        <p>Quantity: {order.productqty}</p>
                                        <p>Payment: {payment}</p>
                                    </div>

                                    <p
                                        className={`p-2 ${style.btn} text-center text-light rounded ${order.deliverystatus === "Delivered"
                                            ? "bg-success"
                                            : order.deliverystatus === "picked by delivery partner"
                                                ? "bg-warning"
                                                : order.deliverystatus === "Shipped"
                                                    ? "bg-secondary"
                                                    : "bg-danger"
                                            }`}
                                    >
                                        Status: {order.deliverystatus}
                                    </p>

                                    {/* Show rate button only for delivered orders */}
                                    <div key={order.orderId}>
                                        {order.deliverystatus === "Delivered" && (
                                            <button className={style.btn} onClick={() => ratingBtnHandler(order.productid)}>
                                                Rate this Product
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default OrderItems;
