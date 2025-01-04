import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ProductCard({ id, image, name, category }) {
    return (
        <Link to={`products/${id}`} className="card productCard text-center">
            <img className="card-img-top" src={image} alt="ProductImage" />
            <div className="card-body">
                <h4 className="card-title">{name}</h4>
                <p className="card-text d-flex gap-2 align-items-center justify-content-center">
                    {category} <i className="bi bi-arrow-right fs-4"></i>
                </p>
            </div>
        </Link>
    );
}

ProductCard.propTypes = {
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
};

export default ProductCard;
