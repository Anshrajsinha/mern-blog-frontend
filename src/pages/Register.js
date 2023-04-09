import { useState } from "react"
import { api } from "../api"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Register = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const register = async (ev) => {
        ev.preventDefault()
        const response = await axios.post(`${api}/auth/register`, {
            name, email, password
        })
        if (response.data.name) {
            return alert("You are registered"),
            navigate("/login")
        }
        if (response.data.message.message) {
            return alert(response.data.message.message)
        }
        if (response.data.message) {
            return alert(response.data.message)
        }
    }
    return (
        <div className="auth">
           <form onSubmit={register} className="form">
            <h1 className="h1-1">Register</h1>
            <input type="text" placeholder="name"
                   value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="email"
                   value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="password"
                   value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="btn1">register</button>
           </form>
        </div>
    )
}