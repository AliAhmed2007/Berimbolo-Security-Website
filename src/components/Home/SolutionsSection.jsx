import { Link } from "react-router-dom"
import FacilitiesSolution from "../../assets/images/AllFacilities.jpg";
import AssemblingSolution from "../../assets/images/AssembelService.png";
import ReadyProducts from "../../assets/images/ReadyProducts.png";

function SolutionsSection() {
    return (
        <>
            <div className="solutions-content">
                <h1>Our Solutions Overview</h1>
                <p className="fs-5 text-black-50">Discover our comprehensive solutions for various facility types, as well as the stories of our customers and partnerships. Assemble your own kit of Ajax devices for security and comfort.</p>
            </div>
            <div className="solutions-body d-flex flex-wrap gap-4 justify-content-evenly align-items-center py-5">
                <Link className="solutions-links text-center">
                    <div className="solution-image">
                        <img src={FacilitiesSolution} alt="FacilitiesSolution" />
                    </div>
                    <h4 className="mt-4">Solutions By Facility Type</h4>
                </Link>
                <Link className="solutions-links text-center">
                    <div className="solution-image">
                        <img src={AssemblingSolution} alt="FacilitiesSolution" />
                    </div>
                    <h4 className="mt-4">Assemble Your Berimbolo System</h4>
                </Link>
                <Link className="solutions-links text-center">
                    <div className="solution-image">
                        <img src={ReadyProducts} alt="FacilitiesSolution" />
                    </div>
                    <h4 className="mt-4">Ready Products</h4>
                </Link>
            </div>
        </>
    )
}

export default SolutionsSection