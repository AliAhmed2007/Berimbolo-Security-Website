import { useState } from "react";
import TestimonialCard from "./TestimonialCard";
import Boy from "../../assets/images/boy.jpg"
import anotherBoy from "../../assets/images/anotherBoy.jpg"
import { Link } from "react-router-dom";

const reviews = [
    {
        name: "Ali Ahmed",
        photo: anotherBoy,
        review: "This service has been amazing! I saw results within a week, and the team is so supportive. Highly recommend it to anyone!",
        stars: 5
    },
    {
        name: "علي حلوان",
        photo: Boy,
        review: "A truly exceptional experience. I can’t believe how much progress I've made. The customer support is top-notch and helped me every step of the way.",
        stars: 4
    },
    {
        name: "Ali Helwan",
        photo: anotherBoy,
        review: "I’m very happy with the results. The process was easy, and the impact was noticeable right away. This is exactly what I needed!",
        stars: 3
    },
    {
        name: "Afsha",
        photo: Boy,
        review: "The service exceeded my expectations. The team was professional and the results were fantastic. I would definitely use this service again.",
        stars: 5
    },
    {
        name: "Osama Elzero",
        photo: anotherBoy,
        review: "I was skeptical at first, but the results speak for themselves. The team was very helpful and the process was smooth.",
        stars: 2
    },
    {
        name: "Cristiano Ronaldo",
        photo: Boy,
        review: "A great experience from start to finish. The team was knowledgeable and the results were impressive. Highly recommended!",
        stars: 5
    }
];

function Testimonials() {
    const [showMore, setShowMore] = useState(false)

    function handleShowMore() {
        setShowMore(!showMore)
    }

    const renderStars = (rating) => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={`star ${i < rating ? 'filled' : ''}`}
                >
                    &#9733;
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="container my-5" id="testimonials">
            <h2 className="text-center mb-4">What Our Customers Say</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {reviews.slice(0, 3).map((testimonial, index) => (
                    <TestimonialCard key={index} {...testimonial} renderStars={renderStars} />
                ))}
                { showMore && reviews.slice(3).map((testimonial, index) => (
                    <TestimonialCard key={index} {...testimonial} renderStars={renderStars} />
                ))}
            </div>
            <div className="text-center mt-4 d-flex flex-row gap-4 justify-content-center">
                <button className="btn btn-primary" onClick={handleShowMore}>Show {showMore ? "Less" : "More"}</button>
                <Link to='testimonials' className="btn btn-secondary" onClick={handleShowMore}>All Reviews</Link>
            </div>
        </div>
    );
}

export default Testimonials;
