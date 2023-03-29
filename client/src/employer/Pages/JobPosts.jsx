import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Post from "../Components/Post";

const JobPosts = () => {
  const [posts, setposts] = useState([]);
  const [userEmail, setuserEmail] = useState("");

  const getPosts = async () => {
    const req = await fetch("http://localhost:9002/employer/api/viewAllJobs");

    const data = await req.json();
    if (data.status === "ok") {
      // console.log(data.posts)
    } else {
      alert(data.error);
    }
    setposts(data.posts);
    // console.log(data)
  };

  useEffect(() => {
    getPosts();
    const token = localStorage.getItem("token");
    if (token) {
      const employer = jwt_decode(token);
      if (!employer) {
        localStorage.removeItem("token");
        window.location.href = "/employer/home";
      } else {
        setuserEmail(employer.email);
      }
    } else {
      console.log("Token not found!");
      // window.location.href = '/employer/login'
    }
  }, []);

  return (
    <div>
      <h1>Job Board</h1>
      <div className="posts">
        {posts.map((post, ind) => {
          console.log(post);

          return <Post key={ind} email={userEmail} details={post} />;
        })}
      </div>
    </div>
  );
};

export default JobPosts;
