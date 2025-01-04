import ShoppingIcon from "../../assets/icons/ShoppingMan.svg";
function HeroSection() {
    return (
        <div className="products-hero text-dark d-flex align-items-center">
            <div className="container">
                <div className="row justify-content-center align-items-center pt-5">
                    <div className="col col-sm-6">
                        <div className="products-hero-content mb-4">
                            <h1>Discover Premium Security Products Built for Your Safety</h1>
                            <p>From smart surveillance cameras to advanced alarm systems, find everything you need to protect your home and business with cutting-edge technology and unparalleled reliability.</p>
                        </div>
                        <a href="#shopping" className="btn btn-primary btn-lg ">Shop Now <i className="bi bi-arrow-down"></i> </a>
                    </div>
                    <div className="col-6 d-none d-sm-block">
                        <div className="products-hero-image ">
                            <img src={ShoppingIcon} alt="Shopping Man Image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection