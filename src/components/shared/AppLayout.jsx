import { Outlet, useLocation } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import GoUpBtn from "./GoUpBtn"

function AppLayout() {

    const currentPath = useLocation()
    const showSignUp = currentPath.pathname === '/register' || currentPath.pathname === '/login'

    return (
        <>
            <Header />
            <Outlet />
            {
                !showSignUp && <Footer />
            }

            {
                !showSignUp && <GoUpBtn />
            }
            
        </>
    )
}

export default AppLayout