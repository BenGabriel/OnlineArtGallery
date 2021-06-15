import React, { useEffect } from "react";
import { Toast, URL } from "./Dashboard/Helper";
import Loader from "./Loader";

const Redirect = (props) => {
  const params = window.location.search;
  // const status = params.get("status");
  // const tx_ref = params.get("tx_ref");
  // const transaction_id = params.get("transaction_id");

  // console.log(status, tx_ref, transaction_id);
  console.log(params);

  const subscribe = async () => {
    const token = await localStorage.getItem("token");

    fetch(`${URL}/subscribe/${params}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.detail === "Transaction failed") {
          Toast.error("Transaction Failed");
          props.history.push("/addpost");
        } else {
          Toast.success("Transaction successful");
          props.history.push("/addpost");
        }
      })
      .catch((err) => {
        console.log(err);
        Toast.error("Transaction Failed");
      });
  };

  useEffect(() => {
    subscribe();
  }, []);
  return <Loader />;
};

export default Redirect;
