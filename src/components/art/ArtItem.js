import React, { useState, useEffect } from "react";
import axios from "axios";
import Comment from "../Comment";
import "./Painting/Paintings.css";
import { Link } from "react-router-dom";
import { URL } from "../Dashboard/Helper";
import { FaRegComment, FaDownload } from "react-icons/fa";
import Loader from "../Loader";
import Footer from "../Footer";

const ArtItem = (props) => {
  const postid = props.match.params.id;

  const [rnum, setRum] = useState(false);
  const [postData, setPostData] = useState(null);
  const [commentId, setCommentId] = useState("");

  const getSinglePost = async () => {
    try {
      const res = await axios.get(`${URL}/posts/${postid}/`);
      setPostData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSinglePost();
  }, []);

  const controlClick = (id) => {
    setCommentId(id);
    setRum(!rnum);
  };

  const fetchFile = async () => {
    // const res = await axios.get(`${postData.image}`, {
    //   responseType: "blob",
    // });
    // .then(response => {
    //     const url = window.URL.createObjectURL(new Blob([response.data]));
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.setAttribute(
    //         "download",
    //         `${this.props.file.name}.${this.props.file.mime}`
    //     );
    //     document.body.appendChild(link);
    //     link.click();
    // });\
    // console.log(res);
    fetch(`${postData.image}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `FileName.jpg`);

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      });
  };
  return (
    <div className="painting-container art-item">
      <div className="artitem-contianer">
        {postData === null ? (
          <Loader />
        ) : (
          <div className="artitem-artdetails">
            <div className="artitem-image-details">
              <p>
                <b>Name:</b> {postData.caption}
              </p>
              <p style={{ textDecoration: "none" }}>
                <Link
                  to={`/artist/${postData.user.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <b>Artist Name:</b> {postData.user.username}
                </Link>
              </p>
              <p>
                <b>Category:</b> {postData.category}
              </p>
              <p>
                <b>Tags:</b>{" "}
                {postData.tags.map((tag) => (
                  <i key={tag}>{tag}, </i>
                ))}
              </p>
              <p>
                <b>Description:</b> {postData.description}
              </p>
            </div>
            <div className="artitem-image-container">
              <img src={postData.image} alt="" />
              <div className="likes-comment">
                <button onClick={fetchFile}>
                  {/* <Link to={postData.image} target="_blank"> */}
                  Download{" "}
                  <FaDownload
                    color={"white"}
                    size={15}
                    style={{ paddingTop: "4px" }}
                  />
                  {/* </Link> */}
                </button>
                <button onClick={() => controlClick(postData.id)}>
                  Comment{" "}
                  <FaRegComment
                    color={"black"}
                    size={15}
                    style={{ paddingTop: "4px" }}
                  />
                </button>
              </div>
            </div>
            <div className="comment-section">
              <h3>Comment</h3>
              <div className="comment-comment">
                {postData.comments.map((comment) => (
                  <div key={comment.id} className="comment-div">
                    <h4>{comment.name}</h4>
                    <p>{comment.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {rnum ? (
        <div className="comment-container">
          <Comment
            controlClick={controlClick}
            commentId={commentId}
            getSinglePost={getSinglePost}
          />
        </div>
      ) : null}
      <Footer />
    </div>
  );
};

export default ArtItem;
