import React, { useState, useEffect } from "react";
import { Container, Toast, URL } from "./Helper";
import image2 from "../../images/7.jpg";
import "./Dashboarditem.css";
import { RiDeleteBinLine, RiSendPlane2Fill } from "react-icons/ri";
import axios from "axios";
import Loader from "../Loader";

const DashboardItem = (props) => {
  const postid = props.match.params.id;

  const [postData, setPostData] = useState(null);
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSinglePost = async () => {
    try {
      const res = await axios.get(`${URL}/posts/${postid}/`);
      setPostData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSinglePost();
  }, []);

  const sendComment = () => {
    if (comment === "") {
      return Toast.error("No field should be empty");
    }
    setLoading(true);
    fetch(`${URL}/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: postData.user.username,
        post_id: postid,
        body: comment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setComment("");
        getSinglePost();
        Toast.success("Comment Submitted");
      })
      .catch((err) => console.log(err));
  };

  const handler = (e) => {
    if (e.key === "Enter") {
      sendComment();
    }
  };

  const deletePost = async () => {
    const token = await localStorage.getItem("token");
    console.log(token);
    try {
      const res = await axios.delete(`${URL}/posts/${postid}/`);
      console.log(res);
      Toast.success("Post Deleted");
      props.history.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <div className="dashboarditem-container">
        {postData === null ? (
          <Loader />
        ) : (
          <>
            <div className="dashboarditem-mid-image">
              <img src={postData.image} />
              <div className="dashboarditem-mid-details">
                <div className="dashboarditem-mid-det">
                  <div>
                    <h4>Caption :</h4>
                    <p>{postData.caption}</p>
                  </div>
                  <div>
                    <h4>Category :</h4>
                    <p>{postData.category}</p>
                  </div>
                  <div>
                    <h4>Tags :</h4>
                    {postData.tags.map((tag) => (
                      <i key={tag} className="i">
                        {`${tag},`} &nbsp;
                      </i>
                    ))}
                  </div>
                </div>
                <div className="dashboarditem-delete" onClick={deletePost}>
                  <RiDeleteBinLine size={20} color="#fff" />
                </div>
              </div>
            </div>
            <div className="artist-comment">
              <h2>Comments</h2>
              <div className="comment-comment">
                {postData.comments.map((comment) => (
                  <div key={comment.id} className="comment-div">
                    <h4>{comment.name}</h4>
                    <p>{comment.body}</p>
                  </div>
                ))}
              </div>
              <div className="comment-input">
                <input
                  type="text"
                  value={comment}
                  placeholder="Enter Comment"
                  onChange={(e) => setComment(e.target.value)}
                  onKeyPress={(e) => handler(e)}
                />
                {loading ? (
                  <Loader />
                ) : (
                  <RiSendPlane2Fill size={25} onClick={sendComment} />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default DashboardItem;
