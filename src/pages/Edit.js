import { useEffect, useState } from "react";
import { api } from "../api";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Edit = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [readingTime, setReadingTime] = useState('')
    const fetch = async () => {
        const response = await axios.get(`${api}/posts/post/${id}`)
        setTitle(response.data.title)
        setSummary(response.data.summary)
        setContent(response.data.content)
        setImageUrl(response.data.imageUrl)
        setReadingTime(response.data.readingTime)
    }
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
    useEffect(() => {
        fetch()
    }, [])
    const edit = async (ev) => {
        ev.preventDefault()
        const response = await axios.put(`${api}/posts/post/${id}`, {
            title, summary, content, imageUrl, readingTime
        })
        alert("Post Updated")
        navigate(`/posts/${id}`)
    }
    return (
        <div>
            <form onSubmit={edit} className="form-post" >
                <textarea type="text" placeholder="title" className="title"
                value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea type="text" placeholder="summary" className="summary"
                value={summary} onChange={(e) => setSummary(e.target.value)} />
                <textarea type="text" placeholder="content" className="content"
                value={content} onChange={(e) => setContent(e.target.value)} />
                <label for="imageUrl" className="label">Change Image</label>
                <input type="file" className="imageUrl" id="imageUrl"
                onChange={(e) => setImageUpload(e.target.files[0])} />
                <input type="text" placeholder="reading time (in minutes)" className="rT"
                value={readingTime} onChange={(e) => setReadingTime(e.target.value)} />
                {imageUrl && <img src={imageUrl} alt="image" className="img-1"/>}
                <button className="btn-create">Update Post</button>
            </form>
        </div>
    )
}