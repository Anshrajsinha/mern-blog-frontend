import { useState } from "react"
import { api } from "../api"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../userContext"

export const Login = () => {
    const { userInfo, setUserInfo } = useContext(UserContext)
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const login = async (ev) => {
        ev.preventDefault()
        const response = await axios.post(`${api}/auth/login`, {
            name, email, password
        })
        if (response.data.message) {
            return alert(response.data.message)
        }
        setUserInfo(response.data)
        navigate("/")
    }
    return (
        <div className="auth">
           <form onSubmit={login} className="form">
            <h1 className="h1-1">Login</h1>
            <input type="text" placeholder="name"
                   value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="email"
                   value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="password"
                   value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="btn1">login</button>
           </form>
        </div>
    )
}