import React, { useContext, useState, useEffect } from "react";
import { Container, Toast } from "./Helper";
import "./AddPost.css";
import ArtistContext from "../../context/ArtistContext/ArtistContext";

const AddPost = (props) => {
  const { createPost, clearPost, postState } = useContext(ArtistContext);
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
    }, 2000);
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

  return (
    <Container>
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
              <option value="print">Prints</option>
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
            <input
              type="submit"
              className="auth-btn"
              value="Add Post"
              onClick={addPost}
              disabled={loading}
            />
          </form>
          <div className="addpost-container-div">
            <h2>ifeoma</h2>
            <p>lorem tags isupm diefis</p>
            <p>lorem tags isupm diefis</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AddPost;
