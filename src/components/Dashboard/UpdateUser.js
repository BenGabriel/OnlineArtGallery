import axios from "axios";
import "./Updateuser.css";
import Loader from "../Loader";
import { useHistory } from "react-router-dom";
import { Container, Toast, URL } from "./Helper";
import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";

const UpdateUser = () => {
  const { artist } = useContext(AuthContext);

  // console.log(artist);

  const [update, setUpdate] = useState({
    firstname: artist.first_name,
    lastname: artist.last_name,
    email: artist.email,
    username: artist.username,
    phone: artist.phone_number,
    location: artist.city,
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const {
    firstname,
    lastname,
    email,
    username,
    phone,
    image,
    location,
  } = update;

  const history = useHistory();

  const handleUpdate = async (e) => {
    const token = localStorage.getItem("token");
    setLoading(true);
    e.preventDefault();
    if (
      username === "" ||
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      location === ""
    ) {
      return Toast.error("Please fill in all the empty fields");
    }

    const formData = new FormData();
    image !== ""
      ? formData.append("avatar", image, image.name)
      : formData.append("avatar", image);

    const option = {
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstname,
        last_name: lastname,
        email,
        city: location,
        phone_number: phone,
        username,
      }),
    };

    const options = {
      // method: "POST",
      headers: {
        mode: "no-cors",
        Authorization: `Token ${token}`,
        "Content-Type": "multipart/form-data",
      },
      // body: formData,
    };

    if (image !== "") {
      fetch(`${URL}/users/${artist.id}/`, option)
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
      try {
        const res = await axios.post(
          `${URL}/users/${artist.id}/avatar/`,
          formData,
          options
        );
        setLoading(false);
        Toast.success("Profile Updated");
        history.push("/dashboard");
      } catch (error) {
        console.log(error);
      }
    } else {
      fetch(`${URL}/users/${artist.id}/`, option)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setLoading(false);
          Toast.success("Profile Updated");
          history.push("/dashboard");
        })
        .catch((err) => console.log(err));
    }
  };

  const handleFileChange = (e) => {
    setUpdate({
      ...update,
      image: e.target.files[0],
    });
  };

  return (
    <Container>
      <div className="updateuser-container">
        <div className="updateuser-container-mid">
          <form className="updateuser-form">
            <h2>Update User Profile</h2>
            <label>username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUpdate({ ...update, username: e.target.value });
              }}
            />
            <label>Firstname</label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => {
                setUpdate({ ...update, firstname: e.target.value });
              }}
            />
            <label>lastname</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => {
                setUpdate({ ...update, lastname: e.target.value });
              }}
            />
            <label>email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setUpdate({ ...update, email: e.target.value });
              }}
            />
            <label>phone number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setUpdate({ ...update, phone: e.target.value })}
            />
            <label>location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => {
                setUpdate({ ...update, location: e.target.value });
              }}
            />
            <label>Add Image</label>
            <input type="file" onChange={handleFileChange} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <input
                type="submit"
                value="update user"
                className="auth-btn"
                onClick={(e) => handleUpdate(e)}
              />
              {loading ? <Loader /> : null}
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default UpdateUser;
