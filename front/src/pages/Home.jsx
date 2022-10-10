import Post from "../components/Post";
import axios from "axios";
import logo from "../logo/15.png";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/posts")
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  }, []);

  return (
    <main>
      <h1>Accueil</h1>
      <section className="posts">
        {posts.map((post) => (
          <Post
            id={post._id}
            title={post.title}
            text={post.text}
            image={post.image}
            userName="@moi"
            date="2022.09.19, 13:22:31"
            avatar=""
            
          />
        ))}
      </section>
    </main>
  );
};

export default Home;
