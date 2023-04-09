import { useContext } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { api } from "./api"
import { UserContext } from "./userContext"

export const Header = () => {
    const { userInfo, setUserInfo } = useContext(UserContext)
    const name = userInfo
    const logout = () => {
        setUserInfo(null)
    }
    return (
        <div className="header">
            <Link to={'/'} className="blogs-link">Blogs</Link>
            {name && (
                <div className="header-user">
                    <Link to={'/create'} className="create">Create</Link>
                    <button onClick={logout}>Logout</button>
                </div>
            )}
            {!name && (
                <div className="lo-re">
                    <Link to="/login" className="login-link">Login</Link>
                    <Link to="/register" className="register-link">Register</Link>
                </div>
            )}
        </div>
    )
}