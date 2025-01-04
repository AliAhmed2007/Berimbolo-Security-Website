
import { useContext } from 'react';
import { cartContext } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';
import CartModal from '../../components/Cart/CartModal';
import { auth } from '../../firebase/firebase';
import UnAuthorized from '../UnAuthorized';

function Cart() {
    const { cart, dispatch } = useContext(cartContext);

    const incrementQuantity = (id) => {
        dispatch({ type: 'INCREMENT_QUANTITY', payload: { id } })
    };

    const decrementQuantity = (id) => {
        dispatch({ type: 'DECREMENT_QUANTITY', payload: { id } })

    };

    const deleteFromCart = (id) => {
        const itemToRemove = cart.cartItems.find(item => item.id === id);
        if (itemToRemove) {
            dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
        }
    };

    const calculateEverything = () => {
        let totalAmount = 0;
        let discount = 0;
        cart.cartItems.forEach(item => {
            totalAmount += item.price[0] * (cart.quantity[item.id] || 1)
            discount += (item.price[0] - item.price[1]) * (cart.quantity[item.id] || 1)
        });
        let netAmount = totalAmount - discount;
        return { totalAmount, discount, netAmount };
    };

    const { totalAmount, discount, netAmount } = calculateEverything();


    if (!auth?.currentUser) return <UnAuthorized />

    return (
        <div className="cart-page row">
            <div className="col-12 text-center py-4">
                <h1 className='d-flex align-items-center gap-3 m-0 justify-content-center'>
                    Cart Items <i className='bi bi-cart-fill fs-1'></i>
                </h1>
            </div>

            <div className="col-7 cart-items mb-5" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
                {cart.cartItems.length > 0 ? cart.cartItems.map(item => (
                    <div className="d-flex gap-4 justify-content-center align-items-center p-2" key={item.id}>
                        <div className="image">
                            <img src={item.image} width={200} height={200} alt="ItemImage" />
                        </div>
                        <div className="d-flex flex-column py-5 gap-2">
                            <h4>{item.name}</h4>
                            <p>{item.description}</p>
                            <p className="m-0 mb-2 fw-bold">
                                $
                                {item.hasDiscount ? (
                                    <span>
                                        {item.price[1]}{' '}
                                        <span className="old-price text-decoration-line-through fw-normal fs-6">
                                            ${item.price[0]}
                                        </span>
                                    </span>
                                ) : (
                                    item.price[0]
                                )}
                            </p>
                            <div className="quantity-counter d-flex align-items-center justify-content-center gap-3">
                                <button
                                    onClick={() => decrementQuantity(item.id)}
                                    className="minus btn btn-dark rounded-circle"
                                >
                                    <i className='bi bi-dash'></i>
                                </button>
                                <div className="quantity">{cart.quantity[item.id]}</div>
                                <button
                                    onClick={() => incrementQuantity(item.id)}
                                    className="plus btn btn-dark rounded-circle"
                                >
                                    <i className='bi bi-plus'></i>
                                </button>
                            </div>
                        </div>
                        <div className="delete">
                            <button
                                className='btn btn-outline-danger btn-lg'
                                onClick={() => deleteFromCart(item.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )) : (
                    <Link className='fs-3 fw-bold text-primary d-block text-center mt-5 back-to-all' to=".." relative='path'>
                        Your Cart is empty, Fill it
                    </Link>
                )}
            </div>

            <div className="col-5">
                <div className="payment-summary card p-4 mt-5 me-5">
                    <h3>Payment Summary</h3>
                    <hr />
                    <p>
                        <strong>Total Items:</strong> {cart.cartItems.length}
                    </p>
                    <p>
                        <strong>Total Amount:</strong> ${totalAmount.toFixed(2)}
                    </p>
                    <p>
                        <strong>Discount:</strong> ${discount.toFixed(2)}
                    </p>
                    <h4>
                        <strong>Net Amount:</strong> ${netAmount.toFixed(2)}
                    </h4>
                    <button className="btn btn-success btn-lg w-100 mt-3" type="button" data-bs-toggle="modal" data-bs-target="#cart-modal">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
            <CartModal />
        </div>
    );
}

export default Cart;
