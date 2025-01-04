import PropTypes from 'prop-types';

function TestimonialCard({ photo, name, review, stars, renderStars }) {
    return (
        <div className="col">
            <div className="card shadow-sm border-light">
                <img
                    src={photo}
                    className="card-img-top rounded-circle mx-auto d-block mt-3"
                    alt={name}
                    style={{ width: '100px', height: '120px' }}
                />
                <div className="card-body">
                    <h5 className="card-title text-center">{name}</h5>
                    <div className="text-center mb-2">
                        <div className="star-rating">
                            {renderStars(stars)}
                        </div>
                    </div>
                    <p className="card-text text-center">{review}</p>
                </div>
            </div>
        </div>
    );
}

TestimonialCard.propTypes = {
    photo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    review: PropTypes.string.isRequired,
    stars: PropTypes.number.isRequired,
    renderStars: PropTypes.func.isRequired
};

export default TestimonialCard;
