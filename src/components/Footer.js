import React from "react";
import { Link } from "react-router-dom";
import "./Main.css";

const Footer = () => {
  return (
    <section className="footer">
      <div className="footer1">
        <h2>Join Ifeoma</h2>
        <p>
          Download royalty free Art, Share your own Arts as public domain with
          people all over the world
        </p>
        <button className="btn btn-own">
          <Link
            to="/signup"
            style={{ color: "#6b3fb2", textDecoration: "none" }}
          >
            Sign Up Here
          </Link>
        </button>
      </div>
    </section>
  );
};

export default Footer;
