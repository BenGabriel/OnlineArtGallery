import React, { useContext, useState, useEffect } from "react";
import { Container, Toast, URL } from "./Helper";
import "./AddPost.css";
import ArtistContext from "../../context/ArtistContext/ArtistContext";
import Loader from "../Loader";
import AuthContext from "../../context/AuthContext/AuthContext";
import axios from "axios";

const AddPost = (props) => {
  const { createPost, clearPost, postState } = useContext(ArtistContext);
  const { artist } = useContext(AuthContext);

  console.log(artist);

  const [post, setPost] = useState({
    caption: "",
    tag: "",
    select: "drawing",
    image: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const { caption, tag, select, image, description } = post;

  useEffect(() => {
    if (postState) {
      props.history.push("/dashboard");
    }
    return () => {
      clearPost();
    };
  }, [postState, props.history]);

  const addPost = (e) => {
    e.preventDefault();
    console.log("hi");
    if (
      caption === "" ||
      tag === "" ||
      select === "" ||
      description === "" ||
      image === ""
    ) {
      return Toast.error("No field Should be empty");
    }
    const formData = new FormData();
    setLoading(true);

    formData.append("image_", image, image.name);
    formData.append("caption", caption);
    formData.append("category", select);
    formData.append("tags_", tag);
    formData.append("description", caption);

    // console.log(image);
    createPost(formData);
    setTimeout(() => {
      setLoading(false);
    }, 30000);
  };

  const handlePostChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setPost({
      ...post,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setPost({
      ...post,
      image: e.target.files[0],
    });
  };

  const subscribe = async () => {
    const token = await localStorage.getItem("token");
    try {
      const res = await axios.get(`${URL}/subscribe/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      window.location.replace(`${res.data.payment_link}`);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      {artist === null ? (
        <Loader />
      ) : artist.is_subscribed ? (
        <div className="addpost-container">
          <div className="addpost-container-mid">
            <form className="addpost-container-form">
              <h2>Add Post</h2>

              <label>Caption</label>
              <input
                type="text"
                name="caption"
                value={caption}
                onChange={handlePostChange}
              />
              <label>Categories</label>
              <select name="select" value={select} onChange={handlePostChange}>
                <option value="drawing">Drawings</option>
                <option value="painting">Paintings</option>
                <option value="sculpture">Sculpture</option>
                <option value="photography">Photography</option>
              </select>
              <label>description</label>
              <input
                type="text"
                name="description"
                value={description}
                onChange={handlePostChange}
              />
              <label>Tags</label>
              <input
                type="text"
                name="tag"
                placeholder="Tags, Name"
                value={tag}
                onChange={handlePostChange}
              />
              <label>Add Image</label>
              <input type="file" onChange={handleFileChange} />
              {loading ? (
                <div style={{ marginTop: "40px" }}>
                  <Loader />
                </div>
              ) : (
                <input
                  type="submit"
                  className="auth-btn"
                  value="Add Post"
                  onClick={addPost}
                  disabled={loading}
                />
              )}
            </form>
            <div className="addpost-container-div">
              <h2>Online Art Gallery</h2>
              <p>Add a post to inspire the world</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="subscribe">
          <p>Please subscribe to Continue</p>
          <button onClick={subscribe}>Subscribe</button>
        </div>
      )}
    </Container>
  );
};

export default AddPost;
