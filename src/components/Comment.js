import React, { useState } from "react";
import "./Main.css";
import { AiOutlineClose } from "react-icons/ai";
import { Toast, URL } from "./Dashboard/Helper";

const Comment = ({ controlClick, commentId, getSinglePost }) => {
  const [comments, setComments] = useState({
    name: "",
    comment: "",
  });

  const { name, comment } = comments;
  const makeComment = (e) => {
    e.preventDefault();
    if (name === "" || comment === "") {
      return Toast.error("No field should be empty");
    }
    fetch(`${URL}/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        post_id: commentId,
        body: comment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (getSinglePost !== undefined) {
          getSinglePost();
          Toast.success("Comment Submitted");
          controlClick();
        } else {
          Toast.success("Comment Submitted");
          controlClick();
        }
      })
      .catch((err) => {
        console.log(err);
        Toast.error(`${err.message}`);
      });
  };

  const handlePostChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setComments({
      ...comments,
      [name]: value,
    });
  };
  return (
    <div className="comment">
      <span className="comment-close">
        <h2>Add Comment</h2>
        <AiOutlineClose color="red" size={23} onClick={() => controlClick()} />
      </span>
      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        value={name}
        onChange={handlePostChange}
      />
      <textarea
        type="text"
        name="comment"
        placeholder="comment on the art work"
        id="input"
        value={comment}
        onChange={handlePostChange}
      />
      <button onClick={makeComment}>Comment</button>
    </div>
  );
};

export default Comment;
