import React, { useState, useContext, useEffect } from "react";
import Footer from "../../Footer";
import "../Painting/Paintings.css";
import Comment from "../../Comment";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ArtistContext from "../../../context/ArtistContext/ArtistContext";
import Loader from "../../Loader";
import Search from "../../Search";

const Photography = () => {
  const { getPost, post } = useContext(ArtistContext);

  useEffect(() => {
    getPost();
  }, []);

  const [rnum, setRum] = useState(false);
  const [commentId, setCommentId] = useState("");

  const photography =
    post === null
      ? null
      : post.filter((photo) => photo.category === "photography");

  const controlClick = (id) => {
    setCommentId(id);
    setRum(!rnum);
  };

  return (
    <div className="painting-container">
      <div className="painting-second-container">
        <Search />
        <div className="painting-image-container">
          {photography === null ? (
            <Loader />
          ) : (
            photography.map((image) => (
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
      </div>
      <Footer />
    </div>
  );
};

export default Photography;
