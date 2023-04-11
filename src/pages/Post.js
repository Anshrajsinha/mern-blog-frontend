import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import { api } from "../api"
import { useContext } from "react"
import { UserContext } from "../userContext"
import { useNavigate } from "react-router-dom"

export const Post = () => {
    const navigate = useNavigate()
    const { userInfo, setUserInfo } = useContext(UserContext)
    const [post, setPost] = useState({})
    const { id } = useParams()
    const fetch = async () => {
        const response = await axios.get(`${api}/posts/post/${id}`)
        setPost(response.data)
    }
    const deletePost = async () => {
        const response = await axios.delete(`${api}/posts/delete/${id}`)
        navigate("/")
    }
    useEffect(() => {
        fetch()
    }, [])
    return (
        <div className="post">
            {
                userInfo && (
                userInfo.name === post.writer && (
                    <div className="ed-del">
                        <Link to={`/edit/${post._id}`} className="edit-link">Edit</Link>
                        <button onClick={deletePost} className="del-link">Delete</button>
                    </div>
                )
                )
            }
            <h2>{post.title}</h2>
            <h5>{post.summary}</h5>
            <h5>{post.readingTime} min read</h5>
            <h5>By {post.writer}</h5>
            <img src={post.imageUrl} alt="image" />
            <p>{post.content}</p>
        </div>
    )
}