import React, { useContext, useEffect } from "react";
import { Container } from "./Helper";
import "./Dashboard.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "../../context/AuthContext/AuthContext";

const Dashboard = () => {
  const { getArtist, artist } = useContext(AuthContext);

  useEffect(() => {
    getArtist();
  }, []);

  return (
    <Container>
      <div className="dashboard-overall">
        <div className="dashboard-top">
          <h2>Welcome Back</h2>
        </div>
        <div className="dashboard-mid">
          {artist.posts.map((image) => (
            <div key={image.id} className="dasboard-image-container">
              <Link to={`/dashboard/${image.id}`} className="dashboard-content">
                <div className="img-bx">
                  <img src={image.image} alt="image" />
                </div>
                {/* <div className="dashboard-image-btn">
                  <button>Delete</button>
                </div> */}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
