import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [userDetail, setUserDetail] = useState();

  useEffect(() => {
    getUserDetail();
  }, [id]);

  const getUserDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:9002/api/user`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (data.status===200) {
        setUserDetail(data.data);
        setLoading(false);
      }else{
        setError(data.data)
      }
    } catch (e) {
      setError("Something wrong happened");
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  } else if (error) {
    return <h2>Something went wrong</h2>;
  } else {
    return (
      <div>
        <p>User name : {userDetail? userDetail.name : "No such user"}</p>
        <p>
          User email : {userDetail? userDetail.email : "No such user"}
        </p>
      </div>
    );
  }
};
export default UserProfile;
