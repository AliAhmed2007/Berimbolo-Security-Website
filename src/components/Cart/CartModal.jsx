import { useState } from "react"

function CartModal() {
    const [paymentMethod, setPaymentMethod] = useState('credit-card')
    function getSiblings(element) {
        const parent = element.parentElement; // Get the parent element
        if (!parent) return []; // If there's no parent, return an empty array

        // Filter out the element itself from the parent's children
        return Array.from(parent.children).filter(child => child !== element);
    }

    function selectPaymentMethod(event, method) {
        const siblingsList = getSiblings(event.currentTarget)
        siblingsList.forEach(siblingBtn => {
            siblingBtn.classList.replace('btn-success', 'btn-outline-success')
        })
        setPaymentMethod(method)
        event.currentTarget.classList.replace('btn-outline-success', 'btn-success')
    }


    return (
        <div className="modal fade" id="cart-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Payment Methods</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body py-4">
                        <div className="paymentOptions d-flex gap-4 align-items-center justify-content-center flex-wrap py-4">
                            <button
                                className="btn btn-outline-success d-flex gap-2 align-items-center"
                                onClick={(e) => selectPaymentMethod(e, "paypal")}
                            >
                                <i className="bi bi-paypal fs-4"></i> Paypal
                            </button>
                            <button
                                className="btn btn-outline-success d-flex gap-2 align-items-center"
                                onClick={(e) => selectPaymentMethod(e, "cash-on-delivery")}
                            >
                                <i className="bi bi-cash-stack fs-4"></i>   Cash On Delivery
                            </button>
                            <button
                                className="btn btn-success d-flex gap-2 align-items-center"
                                onClick={(e) => selectPaymentMethod(e, "credit-card")}
                            >
                                <i className="bi bi-credit-card-fill fs-4"></i> Credit Card
                            </button>
                            <button
                                className="btn btn-outline-success d-flex gap-2 align-items-center"
                                onClick={(e) => selectPaymentMethod(e, "bank-transfer")}
                            >
                                <i className="bi bi-bank2 fs-4"></i>   Bank Transfer
                            </button>
                        </div>

                        <div className="selected-payment">
                            {paymentMethod === "paypal" && (
                                <form className="paypal-method d-flex flex-column align-items-center p-4 px-5">
                                    <div className="mb-3 w-100">
                                        <label htmlFor="paypal-email" className="form-label">PayPal Email Address</label>
                                        <input
                                            id="paypal-email"
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter your PayPal email"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-lg">Pay with PayPal</button>
                                </form>
                            )}

                            {paymentMethod === "cash-on-delivery" && (
                                <form className="cash-on-delivery d-flex flex-column align-items-center p-4 px-5">
                                    <div className="mb-3 w-100">
                                        <label htmlFor="full-name" className="form-label">Full Name</label>
                                        <input id="full-name" type="text" className="form-control" placeholder="Enter your full name" required />
                                    </div>

                                    <div className="mb-3 w-100">
                                        <label htmlFor="phone-number" className="form-label">Phone Number</label>
                                        <input
                                            id="phone-number"
                                            type="tel"
                                            className="form-control"
                                            placeholder="Enter your phone number"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3 w-100">
                                        <label htmlFor="delivery-address" className="form-label">Delivery Address</label>
                                        <textarea
                                            id="delivery-address"
                                            className="form-control"
                                            placeholder="Enter your delivery address"
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="mb-3 w-100">
                                        <label htmlFor="order-notes" className="form-label">Order Notes (Optional)</label>
                                        <textarea
                                            id="order-notes"
                                            className="form-control"
                                            placeholder="Enter any special instructions"
                                        ></textarea>
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-lg">Confirm Order</button>
                                </form>
                            )}

                            {paymentMethod === "credit-card" && (
                                <form className="credit-card d-flex flex-column align-items-center p-4 px-5">
                                    <div className="mb-3 w-100">
                                        <label htmlFor="cardholder-name" className="form-label">Cardholder Name</label>
                                        <input
                                            id="cardholder-name"
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter cardholder name"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3 w-100">
                                        <label htmlFor="card-number" className="form-label">Card Number</label>
                                        <input
                                            id="card-number"
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter card number"
                                            maxLength="16"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3 w-100">
                                        <label htmlFor="expiry-date" className="form-label">Expiration Date (MM/YY)</label>
                                        <input
                                            id="expiry-date"
                                            type="text"
                                            className="form-control"
                                            placeholder="MM/YY"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3 w-100">
                                        <label htmlFor="cvv" className="form-label">CVV</label>
                                        <input
                                            id="cvv"
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter CVV"
                                            maxLength="3"
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-lg">Pay with Card</button>
                                </form>
                            )}

                            {paymentMethod === "bank-transfer" && (
                                <form className="bank-transfer d-flex flex-column align-items-center p-4 px-5">
                                    <div className="mb-3 w-100">
                                        <label htmlFor="account-holder-name" className="form-label">Account Holder Name</label>
                                        <input
                                            id="account-holder-name"
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter account holder name"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3 w-100">
                                        <label htmlFor="bank-name" className="form-label">Bank Name</label>
                                        <input
                                            id="bank-name"
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter bank name"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3 w-100">
                                        <label htmlFor="account-number" className="form-label">Account Number</label>
                                        <input
                                            id="account-number"
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter account number"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3 w-100">
                                        <label htmlFor="routing-code" className="form-label">Routing/IFSC Code</label>
                                        <input
                                            id="routing-code"
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter routing/IFSC code"
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-lg">Proceed with Bank Transfer</button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CartModal