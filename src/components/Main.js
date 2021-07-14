import React, { useState, useEffect, useContext } from "react";
import "./Main.css";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Comment from "./Comment";
import ArtistContext from "../context/ArtistContext/ArtistContext";
import Loader from "./Loader";
import Search from "./Search";
import AuthContext from "../context/AuthContext/AuthContext";

const Main = (props) => {
  const { getPost, post } = useContext(ArtistContext);
  const { userAuth } = useContext(AuthContext);
  const [rnum, setRum] = useState(false);
  const [commentId, setCommentId] = useState("");

  useEffect(() => {
    if (localStorage.token) {
      props.history.push("/dashboard");
    }
    getPost();
  }, []);

  const controlClick = (id) => {
    setCommentId(id);
    setRum(!rnum);
  };

  const newpost =
    post === null ? post : post.sort((a, b) => 0.2 - Math.random());
  return (
    <>
      <div className="main">
        <div className="main-inner">
          <h1>Amazing Free Art</h1>
          <div className="main-inner-mid">
            <Search />
          </div>
          <p>
            Get your Paintings, Drawings, Scultping, and Photography Art from
            artist all over the world
          </p>
        </div>
      </div>
      <section className="picture-section">
        <div className="picture-section2" id="image">
          {newpost === null ? (
            <Loader />
          ) : (
            newpost.map((image) => (
              <div key={image.id} className="painting-image-holder">
                <Link to={`/art/${image.id}`}>
                  <img src={image.image} alt="" />
                </Link>
                <div className="likes-comment">
                  <p onClick={() => controlClick(image.id)}>
                    <FaRegComment color={"white"} size={14} />
                  </p>
                  <p onClick={() => controlClick(image.id)}>comment</p>
                </div>
              </div>
            ))
          )}
        </div>
        {rnum ? (
          <div className="comment-container">
            <Comment controlClick={controlClick} commentId={commentId} />
          </div>
        ) : null}
      </section>
      <Footer />
    </>
  );
};

export default Main;
