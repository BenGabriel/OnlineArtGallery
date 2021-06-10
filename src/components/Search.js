import axios from "axios";
import React, { useState } from "react";
import { Toast, URL } from "./Dashboard/Helper";
import { useHistory } from "react-router-dom";

const Search = (props) => {
  const [artist, setArtist] = useState("");

  const history = useHistory();
  const handler = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  const onSubmit = async () => {
    console.log(artist);
    try {
      const res = await axios.get(`${URL}/users/?q=${artist}`);
      //   console.log(res.data);

      const data = res.data;
      if (data.length === 0) {
        Toast.error("No Artist With This Username");
      } else {
        history.push(`/artist/${data[0].id}`);
        // console.log(data[0].id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <input
      type="text"
      className="main-inner-form"
      placeholder="Search Artist"
      value={artist}
      onKeyPress={(e) => handler(e)}
      onChange={(e) => setArtist(e.target.value)}
    />
  );
};

export default Search;
