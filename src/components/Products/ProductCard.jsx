import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ProductCard({ id, image, name, category, price, rating, reviews, inStock, hasDiscount, colsNum, addToCart }) {
  const cardsNumInRows = colsNum === 2 ? 'col-12 col-sm-5 col-md-4' : 'col-12 col-sm-4 col-md-3';

  return (
    <Link to={`/products/${id}`} className={`card m-3 position-relative border-0 ${cardsNumInRows} p-0`} data-product-identifier={id} style={{minWidth: '235px'}}>
      <div className="the-image">
        <img className="card-img-top product-img" src={image} alt={name} />
      </div>
      <div className="card-body">
        <h5 className="card-title m-0 mb-2">{name}</h5>
        <p className="card-text m-0 mb-2" style={{ letterSpacing: '1.2px' }}> {category}</p>
        <p className="card-text m-0 mb-2 fw-bold fs-5">$
          {hasDiscount ?
            <span>{price[1]} <span className='old-price text-decoration-line-through fw-normal fs-6'>${price[0]}</span></span>
            : price[0]}</p>
        <div className="d-flex justify-content-between">
          <p className="card-text m-0 mb-2">
            <span className="text-warning"><i className="bi bi-star-fill"></i></span>
            {rating} ({reviews} reviews)
          </p>
          {inStock ? <p className='card-text m-0 mb-2 text-success fw-bold'>In Stock</p> : <p className='card-text m-0 mb-2 text-danger fw-bold'>Out of Stock</p>}
        </div>
        {inStock ? (
          <button onClick={(e) => addToCart(e)} className="btn btn-dark w-100 mt-3 d-flex justify-content-center align-items-center flex-row gap-2">
            <i className="bi bi-plus fs-4"></i> Add To Cart
          </button>
        ) : (
          <button className="btn btn-danger w-100 mt-3 py-2 d-flex justify-content-center align-items-center gap-2">
            Out Of stock
          </button>
        )}
      </div>
      {hasDiscount && <div className="position-absolute rounded-circle bg-warning top-0 start-0 m-2 p-3 fw-bold">Sale</div>}
    </Link>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  colsNum: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.array.isRequired,
  rating: PropTypes.number.isRequired,
  reviews: PropTypes.number.isRequired,
  inStock: PropTypes.bool.isRequired,
  hasDiscount: PropTypes.bool.isRequired,
  addToCart: PropTypes.func.isRequired
};

export default ProductCard;
