import { Link, useNavigate, useParams } from "react-router-dom";
import products from "../../utils/Products";
import { useContext, useState } from "react";
import { cartContext } from "../../contexts/CartContext";
import { auth } from "../../firebase/firebase";
import Message from "../../components/shared/Message";

function ProductDetails() {
  const { dispatch, cart } = useContext(cartContext)
  const [message, setMessage] = useState(null)
  const { id } = useParams();
  const navigate = useNavigate()
  const hasPrivileges = auth.currentUser !== null

  const singleProduct = products.filter(product => product.id === Number(id))[0]
  if (!singleProduct) {
    return <h1>Product not found</h1>;
  }

  const discountPercentage = singleProduct.hasDiscount
    ? 100 - (singleProduct.price[1] / singleProduct.price[0]) * 100
    : 0;


  function addToCart(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!hasPrivileges) {
      setMessage(`You can't Add to Cart If You Aren't Authenticated`);
      setTimeout(() => {
        navigate('/login');
      }, 2000)
      return;
    }

    const existingProductInCart = cart.cartItems.find(item => item.id === Number(singleProduct.id));

    if (existingProductInCart) {
      dispatch({ type: "INCREMENT_QUANTITY", payload: { id: singleProduct.id } });
    } else {
      const addedProduct = products.find(product => product.id === Number(singleProduct.id));
      dispatch({ type: "ADD_TO_CART", payload: addedProduct });
    }
  }

  function cannotShowCart() {
    if (!hasPrivileges) {
      setMessage(`Cann't View Cart If you're not authenticated`)
      setTimeout(() => {
        navigate('/login');
      }, 2000)
    }
  }

  return (
    <div className="container mt-5 mb-5">
      {message && <Message state="error" message={message} />}
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-10">
          <div className="card">
            <div className="row">
              <div className="col-md-6 d-flex align-items-center justify-content-center">
                <div className="images text-center">
                    <img
                      id="main-image"
                      src={singleProduct.image}
                      alt={singleProduct.name}
                      width="350"
                    />
                </div>
              </div>

              <div className="col-md-6">
                <div className="product p-4 text-center text-md-start">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3 flex-wrap">
                      <Link to=".." relative="path" className="ml-1 back-to-all mt-0 mt-xl-4">
                        <i className="bi bi-arrow-left"></i> {' '}
                         Back To All Products
                      </Link>
                      <Link to={hasPrivileges ? '../cart' : ''} relative="path" onClick={cannotShowCart} className="cart btn btn-warning btn-lg mt-4 ms-0 ms-md-4 ms-lg-0">
                        <i className="bi bi-cart-fill fs-4 d-flex gap-2 align-items-center flex-row position-relative">
                          View Cart
                          <span className="position-absolute top-0 start-0 translate-middle badge rounded-circle text-white" style={{ marginTop: '13.7%', marginLeft: '9.7%', fontSize: '12px', paddingTop: '3px' }}>
                            {cart.cartItems.length}
                          </span>
                        </i>
                      </Link>
                    </div>
                  </div>

                  <div className="mt-4 mb-3">
                    <span className="text-uppercase text-muted brand">
                      {singleProduct.category}
                    </span>
                    <h5 className="text-uppercase">{singleProduct.name}</h5>
                    <div className="price">
                      <div className="ml-2">
                        <p className="card-text m-0 mb-2 fw-bold ">
                          $
                          {singleProduct.hasDiscount ? (
                            <span>
                              {singleProduct.price[1]}{" "}
                              <span className="old-price text-decoration-line-through fw-normal fs-6">
                                ${singleProduct.price[0]}
                              </span>
                            </span>
                          ) : (
                            singleProduct.price[0]
                          )}
                        </p>{" "}
                        {singleProduct.hasDiscount ? (
                          <span> {discountPercentage.toFixed(0)}% OFF</span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <p className="about">{singleProduct.description}</p>

                  <div className="features mt-4">
                    <h6 className="text-uppercase">Features</h6>
                    <ul>
                      {singleProduct.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="stock-status mt-4">
                    <h6 className="text-uppercase">
                      {singleProduct.inStock ? (
                        <span className="text-success">In Stock</span>
                      ) : (
                        <span className="text-danger">Out of Stock</span>
                      )}
                    </h6>
                  </div>

                  <div className="ratings-reviews mt-4">
                    <h6 className="text-uppercase">Rating & Reviews</h6>
                    <p>
                      <strong>{singleProduct.rating}</strong> / 5.0{" "}
                      <span className="text-muted">
                        ({singleProduct.reviews} reviews)
                      </span>
                    </p>
                  </div>

                  <div className="cart mt-4 align-items-center">
                    <button
                      className="btn btn-dark text-uppercase mr-2 px-4"
                      disabled={!singleProduct.inStock}
                      onClick={singleProduct.inStock ? addToCart : null}
                    >
                      {singleProduct.inStock ? "Add to cart" : "Out of Stock"}
                    </button>
                    <i className="fa fa-heart text-muted"></i>
                    <i className="fa fa-share-alt text-muted"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
