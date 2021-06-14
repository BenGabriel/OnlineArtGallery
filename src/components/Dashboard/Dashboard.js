import React, { useContext, useEffect } from "react";
import { Container } from "./Helper";
import "./Dashboard.css";
import Loader from "../Loader";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "../../context/AuthContext/AuthContext";

const Dashboard = () => {
  const { getArtist, artist } = useContext(AuthContext);

  useEffect(() => {
    getArtist();
  }, []);

  // const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // array.sort((a, b) => 0.5 - Math.random());

  // console.log(array);
  return (
    <Container>
      <div className="dashboard-overall">
        <div className="dashboard-top">
          <h2>Welcome Back</h2>
        </div>
        <div className="dashboard-mid">
          {artist === null ? (
            <Loader />
          ) : (
            artist.posts.map((image) => (
              <div key={image.id} className="dasboard-image-container">
                <Link
                  to={`/dashboard/${image.id}`}
                  className="dashboard-content"
                >
                  <div className="img-bx">
                    <img src={image.image} alt="image" />
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
