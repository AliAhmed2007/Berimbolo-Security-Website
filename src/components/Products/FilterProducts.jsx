import PropTypes from 'prop-types';

function FilterProducts({ handleFilter }) {
    const productsFilters = [
        { type: "category", title: "By Category", options: ["General Cameras", "CCTV Cameras", "Sensors", "Smart Controls", "Alarms", "Bells"] },
        { type: "stockStatus", title: "By Availability", options: ["In Stock", "Out Of Stock"] },
        { type: "powerSource", title: "By Power Source", options: ["Solar-Powered", "Battery-Powered", "Hard-Wired"] },
        { type: "connectivity", title: "By Connectivity", options: ["WIFI Enabled", "Bluetooth", "Ethernet"] },
        { type: "features", title: "Features & Specifications", options: ["High Resolution", "Night Vision", "Motion Detection", "360° Angle View", "Audio Recording", "Integration"] },
        { type: "sensorDetection", title: "Sensors Type of Detection", options: ["Motion Sensors", "Temperature Sensor", "Glass Break Sensors", "Smoke/CO Sensors", "Flood Sensors"] },
    ]
    return (
        <div className="filter-products col-12 col-sm-5 col-lg-4 p-4 p-md-5 pt-0">
            <div className="filter-header text-center text-sm-start">
                <div className="title d-flex align-items-center justify-content-center pt-4 pt-sm-0 flex-row gap-3">
                    <i className="bi bi-funnel-fill fs-2"></i>
                    <h2 className="m-0">Filter</h2>
                </div>
            </div>
            <div className="filter-sections accordion pt-4" id="filterAccordion">
                {productsFilters.map((filter, index) => (
                    <div key={index} className={`filter-${filter.type} py-2 accordion-item`} style={{ letterSpacing: '1.4px' }}>
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button p-2 collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#filter-${filter.type}`}
                                aria-expanded="false"
                                aria-controls={`filter-${filter.type}`}
                            >
                                {filter.title}
                            </button>
                        </h2>
                        <div id={`filter-${filter.type}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}>
                            <div className="accordion-body">
                                {filter.options.map((option, subIndex) => (
                                    <div key={subIndex} className={`d-flex gap-2 mb-2 align-items-center flex-row`}>
                                        <input
                                            data-filter-type={filter.type}
                                            onClick={(event) => handleFilter(event)}
                                            className="form-check-input"
                                            type="checkbox"
                                            name={option.toLowerCase().replace(/\s+/g, '-')}
                                            id={option.toLowerCase().replace(/\s+/g, '-')}
                                        />
                                        <label htmlFor={option.toLowerCase().replace(/\s+/g, '-')}>{option}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {index < productsFilters.length - 1 && <hr className="my-1" />}
                    </div>
                ))}
            </div>
        </div>
    );
}

FilterProducts.propTypes = {
    handleFilter: PropTypes.func.isRequired,
};

export default FilterProducts;
