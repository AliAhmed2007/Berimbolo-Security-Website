function ProductsSorting() {
  return (
    <>
      <button type="button" className="btn btn-warning mt-4 d-flex align-items-center justify-content-center flex-row btn-lg gap-2 fs-5 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <i className="bi bi-filter-left fs-4"></i> Sort By
      </button>
      <ul className="dropdown-menu">
          <li className="dropdown-item py-2 px-4" style={{ cursor: "pointer" }}>Alphabetically, A to Z</li>
          <li className="dropdown-item py-2 px-4" style={{ cursor: "pointer" }}>Alphabetically, Z to A</li>
          <li className="dropdown-item py-2 px-4" style={{ cursor: "pointer" }}>Price, Low to High</li>
          <li className="dropdown-item py-2 px-4" style={{ cursor: "pointer" }}>Price, High to Low</li>
          <li className="dropdown-item py-2 px-4" style={{ cursor: "pointer" }}>Popularity</li>
      </ul>
    </>
  )
}


export default ProductsSorting
