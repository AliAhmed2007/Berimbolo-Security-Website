/* eslint-disable no-unused-vars */
import { useState, useRef } from 'react';
import ProductCard from './ProductCard';
import {bestProducts} from '../../utils/Products';

const PRODUCTS_TO_DISPLAY = 3;

function ProductsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);

    const handleSlide = (direction) => {
        setCurrentIndex((prevIndex) => {
            let newIndex = prevIndex + direction * PRODUCTS_TO_DISPLAY;
            if (newIndex < 0) return bestProducts.length - PRODUCTS_TO_DISPLAY;  // Ensure it loops from the start
            if (newIndex >= bestProducts.length) return 0;  // Ensure it loops from the end
            return newIndex;
        });

        // Correct scroll logic
        if (carouselRef.current) {
            const scrollAmount = carouselRef.current.clientWidth / PRODUCTS_TO_DISPLAY;
            carouselRef.current.scrollBy({
                left: direction * scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <>
            <div className="products-header d-flex justify-content-between align-items-center flex-wrap">
                <div className="products-content">
                    <h1>Explore Us</h1>
                    <p>Our Products & Services are Designed to Meet Your Security Needs</p>
                </div>
                <div className="transition-buttons d-flex flex-row gap-3 mt-3">
                    <button className="text-white bg-black p-2 rounded-circle" onClick={() => handleSlide(-1)}>
                        <i className="bi bi-arrow-left fs-4"></i>
                    </button>
                    <button className="text-white bg-black p-2 rounded-circle" onClick={() => handleSlide(1)}>
                        <i className="bi bi-arrow-right fs-4"></i>
                    </button>
                </div>
            </div>
            <div className="products-body py-5">
                <div className="carousel-inner d-flex gap-4" ref={carouselRef} style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }}>
                    {bestProducts.map((product) => (
                        <div key={product.id} style={{ flex: `0 0 ${100 / PRODUCTS_TO_DISPLAY}%`, scrollSnapAlign: 'start', height: '100%' }}>
                            <ProductCard {...product} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ProductsSection;
