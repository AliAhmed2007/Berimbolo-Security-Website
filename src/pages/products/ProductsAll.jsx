/* eslint-disable react/no-unescaped-entities */
import ProductCard from "../../components/Products/ProductCard";
import HeroSection from "../../components/Products/HeroSection";
import FilterProducts from "../../components/Products/FilterProducts";
import AppliedFilter from "../../components/Products/AppliedFilter";
import products from "../../utils/Products";
import { filterByAvailability, filterByCategory } from "../../utils/filterFunctions";
import { useState, useContext } from "react";
import ProductsSorting from "../../components/Products/ProductsSorting";
import { Link, useNavigate } from "react-router-dom";
import { cartContext } from "../../contexts/CartContext";
import { auth } from "../../firebase/firebase";
import Message from "../../components/shared/Message";
import Loading from "../../components/shared/Loading";

function ProductsAll() {
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(() => products);
  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const { cart, dispatch } = useContext(cartContext)

  const hasPrivileges = auth.currentUser !== null

  const handleFilter = (e) => {
    const allInputFilters = document.querySelectorAll("input");
    const filterType = e.target.getAttribute("data-filter-type");
    const filterLabel = e.target.nextSibling.textContent;

    let newAppliedFilters = Array.from(allInputFilters).filter((input) => input.checked).map((input) => ({
      id: input.id,
      name: input.name,
      type: input.getAttribute("data-filter-type"),
      plainText: input.nextSibling.textContent,
    }));
    setAppliedFilters(newAppliedFilters);

    if (newAppliedFilters.length === 0) {
      setFilteredProducts(products);
    } else {
      if (filterType === "category") {
        if (e.target.checked) {
          const filteredByCategory = filterByCategory(products, filterLabel);

          const otherFiltersApplied = appliedFilters.filter(
            (filter) => filter.type !== "category"
          );

          const similarFiltersApplied = appliedFilters.filter(
            (filter) => filter.type === "category"
          );

          let finalFilteredProducts = filteredByCategory;

          otherFiltersApplied.forEach((filter) => {
            if (filter.type === "stockStatus") {
              finalFilteredProducts = filterByAvailability(finalFilteredProducts, filter.plainText);
            }
          });

          if (similarFiltersApplied.length > 0) {
            setFilteredProducts((prev) => {
              if (appliedFilters.length === 0) {
                return finalFilteredProducts;
              }

              const mergedProducts = [...prev, ...finalFilteredProducts];

              const uniqueProducts = mergedProducts.filter(
                (value, index, self) => index === self.findIndex((t) => t.id === value.id)
              );

              return uniqueProducts;
            });
          } else {
            setFilteredProducts(finalFilteredProducts)
          }
        } else {

          setFilteredProducts((prev) =>
            prev.filter((product) => product.category !== filterLabel)
          );

          if (newAppliedFilters.length === 1) {
            const otherFiltersApplied = newAppliedFilters.filter(filter => filter.type === 'stockStatus')
            if (otherFiltersApplied.length) {
              otherFiltersApplied.forEach(filter => {
                setFilteredProducts(filterByAvailability(products, filter.plainText))
              })
            }
          }
        }
      } else if (filterType === 'stockStatus') {
        if (e.target.checked) {
          const inputsWithFilterType = document.querySelectorAll('input[data-filter-type="stockStatus"]')
          if (e.target === inputsWithFilterType[0]) {
            inputsWithFilterType[0].checked = true
            inputsWithFilterType[1].checked = false
            setAppliedFilters(prev => prev.filter(filter => filter.plainText !== inputsWithFilterType[1].nextElementSibling.textContent))
          } else {
            inputsWithFilterType[1].checked = true
            inputsWithFilterType[0].checked = false;
            setAppliedFilters(prev => prev.filter(filter => filter.plainText !== inputsWithFilterType[0].nextElementSibling.textContent))
          }

          if (newAppliedFilters.length === 1) {
            setFilteredProducts(filterByAvailability(products, filterLabel))
            return
          }

          const filteredByStock = filterByAvailability(products, filterLabel);

          let filteredByCategory = []

          appliedFilters.filter(filter => filter.type === "category").forEach(filter => {
            filteredByCategory.push(...filterByCategory(filteredByStock, filter.plainText))
          })

          let finalFilteredProducts = filteredByCategory;

          setFilteredProducts(finalFilteredProducts);
        } else {
          const otherFiltersApplied = appliedFilters.filter((filter) => filter.type !== "stockStatus");

          const filteredByCategory = otherFiltersApplied.filter(filter => filter.type === "category")
            .reduce((acc, filter) => filterByCategory(acc, filter.plainText), products);

          let finalFilteredProducts = filteredByCategory;

          setFilteredProducts(finalFilteredProducts);
        }
      }
    }
  };

  const clearFilters = () => {
    document.querySelectorAll("input").forEach((input) => {
      input.checked = false;
    });
    setAppliedFilters([]);
    setFilteredProducts(products);
  };


  function addToCart(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!hasPrivileges) {
      setMessage(`You can't Add to Cart If You Aren't Authenticated`);
      setIsLoading(true)
      setTimeout(() => {
        navigate('/login');
        setIsLoading(false)
      }, 2000)
      return;
    }

    const addedProductId = e.target.closest('.card').getAttribute('data-product-identifier');
    const existingProductInCart = cart.cartItems.find(item => item.id === Number(addedProductId));

    if (existingProductInCart) {
      dispatch({ type: "INCREMENT_QUANTITY", payload: { id: addedProductId } });
    } else {
      const addedProduct = products.find(product => product.id === Number(addedProductId));
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

  const singleRowProducts = filteredProducts.slice(2).map(product => (
    <ProductCard
      key={product.id}
      {...product}
      category={product.category}
      colsNum={3}
      addToCart={addToCart}
    />
  ))

  if (isLoading) {
    return (
      <>
        <Loading />
        {message && <Message state={message.state} message={message.message} />}
      </>
    )
  }

  const itemsCount = cart.cartItems.length
  return (
    <section className="products-section">
      <HeroSection />
      <div className="shopping-area row" id="shopping">
        <FilterProducts handleFilter={handleFilter} />
        <div className="products-view col-12 col-sm-7 co-lg-8">
          <div className="products-header mt-4">
            <h3 className="text-center text-dark">
              From <span className="text-warning">Cameras</span> to{" "}
              <span style={{ color: "#007bff" }}>Alarms</span>, We've Got You
              Covered
            </h3>
            <div className="title d-flex justify-content-center align-items-center  gap-lg-5">
              <ProductsSorting />
              <Link to={hasPrivileges ? 'cart' : ''} onClick={cannotShowCart} className="cart btn btn-warning btn-lg mt-4 ms-0 ms-md-4 ms-lg-0">
                <i className="bi bi-cart-fill fs-4 d-flex gap-2 align-items-center flex-row position-relative">
                  View Cart
                  <span className="position-absolute top-0 start-0 translate-middle badge rounded-circle text-white" style={{ marginTop: '13.7%', marginLeft: '9.7%', fontSize: '12px', paddingTop: '3px' }}>
                    {itemsCount}
                  </span>
                </i>
              </Link>
            </div>
            <div className="applied-filter py-2">
              <div className="d-flex gap-3 align-items-center justify-content-between flex-row py-3">
                <h3>Applied Filters</h3>
                <button
                  className="btn btn-link text-decoration-underline fs-5 d-block ms-auto"
                  onClick={clearFilters}
                  style={{ letterSpacing: "1.1px" }}
                >
                  Clear Filters
                </button>
              </div>
              <div className="applied-filters-area d-flex flex-wrap gap-3">
                {appliedFilters.length > 0 ? (
                  appliedFilters.map((filter) => (
                    <AppliedFilter
                      key={filter.id}
                      {...filter}
                      setAppliedFilters={setAppliedFilters}
                    />
                  ))
                ) : (
                  <p className="text-muted m-auto">There Is No Applied Filters</p>
                )}
              </div>
            </div>
          </div>
          <div className="products-container row justify-content-center align-items-center mt-3">
            {filteredProducts.length > 0 ? filteredProducts.slice(0, 2).map(product => (
              <ProductCard
                key={product.id}
                {...product}
                category={product.category}
                colsNum={2}
                addToCart={addToCart}
              />
            )) : <h2 className="text-black-50 text-center">There is No Matching Filters</h2>}
          </div>
        </div>
        <div className="single-row-products row justify-content-center pt-3">
          {singleRowProducts}
        </div>
      </div>
    </section>
  );
}

export default ProductsAll;