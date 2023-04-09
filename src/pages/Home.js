import { useEffect, useState } from "react"
import axios from "axios"
import { api } from "../api"
import { Link } from "react-router-dom"

export const Home = () => {
    const [posts, setPosts] = useState([])
    const fetch = async () => {
        const response = await axios.get(`${api}/posts`)
        setPosts(response.data)
    }
    useEffect(() => {
        fetch()
    }, [])
    return (
        <div className="home">
            {posts.map((post) => {
                return (
                    <div className="posts-home">
                        <Link to={`posts/${post._id}`} className="post-link">
                        <h4>{post.title}</h4>
                        <img src={post.imageUrl} alt="image" height="70vh"/>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}