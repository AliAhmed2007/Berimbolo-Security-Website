import PropTypes from 'prop-types'

function AppliedFilter({ plainText, id, setAppliedFilters }) {
    const removeFilter = (id) => {
        document.getElementById(id).click()
        setAppliedFilters(prevAppliedFilters => prevAppliedFilters.filter((filter => filter.id !== id)))
    }
    return (
        <button className='btn px-2 fw-bold py-2 applied-filter-btn d-flex align-items-center' onClick={() => removeFilter(id)} style={{ backgroundColor: '#ECEFF1' }}>
            {plainText}
            <span className='ms-2' >
                <i className='bi bi-x fs-5'></i>
            </span>
        </button>
    )
}

AppliedFilter.propTypes = {
    plainText: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    setAppliedFilters: PropTypes.func.isRequired,
}

export default AppliedFilter
