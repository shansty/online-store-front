import { Link } from "react-router-dom"

const HomePage = () => {
    return(
        <>
            <h1>Some HomePage</h1>
            <Link to="/register">
                Register
            </Link>
            <Link to="/login">
                Login
            </Link>
        </>
    )
}

export default HomePage;