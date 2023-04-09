import { useState } from "react";
import { api } from "../api";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useNavigate } from "react-router-dom";

export const Create = () => {
    const navigate = useNavigate()
    const { userInfo, setUserInfo } = useContext(UserContext)
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [readingTime, setReadingTime] = useState('')

    const [imageUpload, setImageUpload] = useState(null)
    const uploadImage = () => {
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrl(url)
            })
        })
        setImageUpload(null)
    }

    if (imageUpload) {
        uploadImage()
    }
    if (!userInfo) {
        return (
            <div className="wrong-create">Please login to create posts</div>
        )
    }
    const writer = userInfo.name
    const post = async (ev) => {
        ev.preventDefault()
        const response = await axios.post(`${api}/posts/create`, {
            title, summary, content, imageUrl, readingTime, writer
        })
        alert("Post Submitted")
        navigate("/")
    }
    return (
        <div>
            <form onSubmit={post} className="form-post" >
                <textarea type="text" placeholder="title" className="title"
                value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea type="text" placeholder="summary" className="summary"
                value={summary} onChange={(e) => setSummary(e.target.value)} />
                <textarea type="text" placeholder="content" className="content"
                value={content} onChange={(e) => setContent(e.target.value)} />
                <label for="imageUrl" className="label">Upload Image</label>
                <input type="file" className="imageUrl" id="imageUrl"
                onChange={(e) => setImageUpload(e.target.files[0])} />
                <input type="text" placeholder="reading time (in minutes)" className="rT"
                value={readingTime} onChange={(e) => setReadingTime(e.target.value)} />
                {imageUrl && <img src={imageUrl} alt="image" className="img-1"/>}
                <button className="btn-create">Submit Post</button>
            </form>
        </div>
    )
}