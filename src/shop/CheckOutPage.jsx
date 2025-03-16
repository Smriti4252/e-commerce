import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../components/modal.css";
import { useLocation, useNavigate } from "react-router";

const CheckOutPage = () => {
    const [show, setShow] = useState(false);
    const [activeTab, setActiveTab] = useState("visa");

    // Handle tab change
    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    // direct to home page
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/"

    const handleOrderConfirm = ()=>{
        alert("Your Order is place successfully!")
        localStorage.removeItem("cart");
        navigate(from,{replace:true})
    }


    return (
        <div className="modalCard">
            <Button variant="primary" className="py-2" onClick={handleShow}>
                Proceed to Checkout
            </Button>

            <Modal show={show} onHide={handleClose} animation={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Select Your Payment Method</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="tabs mt-3">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a
                                    className={`nav-link ${activeTab === "visa" ? "active" : ""}`}
                                    id="visa-tab"
                                    data-bs-toggle="tab"
                                    role="tab"
                                    aria-controls="visa"
                                    aria-selected={activeTab === "visa"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleTabChange("visa");
                                    }}
                                    href="#visa"
                                >
                                    <img
                                        src="https://i.imgur.com/sB4jftM.png"
                                        alt="Visa"
                                        width="80"
                                    />
                                </a>
                            </li>

                            <li className="nav-item" role="presentation">
                                <a
                                    className={`nav-link ${activeTab === "paypal" ? "active" : ""}`}
                                    id="paypal-tab"
                                    data-bs-toggle="tab"
                                    role="tab"
                                    aria-controls="paypal"
                                    aria-selected={activeTab === "paypal"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleTabChange("paypal");
                                    }}
                                    href="#paypal"
                                >
                                    <img
                                        src="https://i.imgur.com/yK7EDD1.png"
                                        alt="PayPal"
                                        width="80"
                                    />
                                </a>
                            </li>
                        </ul>

                        {/* Tab Content */}
                        <div className="tab-content mt-3" id="myTabContent">
                            {/* Visa Content */}
                            <div
                                className={`tab-pane fade ${activeTab === "visa" ? "show active" : ""}`}
                                id="visa"
                                role="tabpanel"
                                aria-labelledby="visa-tab"
                            >
                                <div className="mt-4 mx-4">
                                    <div className="text-center">
                                        <h5>Credit Card</h5>
                                    </div>
                                    <div className="form mt-3">
                                        <div className="inputbox">
                                            <input
                                                type="text"
                                                name="cardholder_name"
                                                id="cardholder_name"
                                                className="form-control"
                                                required
                                            />
                                            <span>Cardholder Name</span>
                                        </div>
                                        <div className="inputbox">
                                            <input
                                                type="text"
                                                name="card_number"
                                                id="card_number"
                                                className="form-control"
                                                required
                                            />
                                            <span>Card Number</span>
                                        </div>
                                        <div className="d-flex flex-row">
                                            <div className="inputbox">
                                                <input
                                                    type="text"
                                                    name="expiry_date"
                                                    id="expiry_date"
                                                    className="form-control"
                                                    required
                                                />
                                                <span>Expiration Date</span>
                                            </div>
                                            <div className="inputbox">
                                                <input
                                                    type="text"
                                                    name="cvv"
                                                    id="cvv"
                                                    className="form-control"
                                                    required
                                                />
                                                <span>CVV</span>
                                            </div>
                                        </div>
                                        <div className="px-5 pay">
                                            <button className="btn btn-success btn-block" onClick={handleOrderConfirm}>
                                                Order Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* PayPal Content */}
                            <div
                                className={`tab-pane fade ${activeTab === "paypal" ? "show active" : ""}`}
                                id="paypal"
                                role="tabpanel"
                                aria-labelledby="paypal-tab"
                            >
                                <div className="mt-4 mx-4">
                                    <div className="text-center">
                                        <h5>PayPal Account Info</h5>
                                    </div>
                                    <div className="form mt-3">
                                        <div className="inputbox">
                                            <input
                                                type="email"
                                                name="paypal_email"
                                                id="paypal_email"
                                                className="form-control"
                                                required
                                            />
                                            <span>Enter your email</span>
                                        </div>
                                        <div className="inputbox">
                                            <input
                                                type="text"
                                                name="paypal_name"
                                                id="paypal_name"
                                                className="form-control"
                                                required
                                            />
                                            <span>Your Name</span>
                                        </div>
                                        <div className="d-flex flex-row">
                                            <div className="inputbox">
                                                <input
                                                    type="text"
                                                    name="extra_info"
                                                    id="extra_info"
                                                    className="form-control"
                                                    required
                                                />
                                                <span>Extra Info</span>
                                            </div>
                                        </div>
                                        <div className="px-5 pay">
                                            <button className="btn btn-primary btn-block" onClick={handleOrderConfirm}>
                                                Add Paypal
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* payment desclaimer */}
                        <p className="mt-3 px-4 p-Disclamier"><em>Payment Disclamier:</em> In no event shall payment or partial payment by Owner for any material or service.</p>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CheckOutPage;
