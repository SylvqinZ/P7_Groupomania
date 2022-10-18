import Post from "../components/Post";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/posts`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main>
      <h1>Accueil</h1>
      <section className="posts">
        {posts.map((post) => (
          <Post
            key={post._id}
            id={post._id}
            title={post.title}
            text={post.text}
            image={post.imageUrl}
            username={post.username}
            date="2022.09.19, 13:22:31"
            avatar=""
          />
        ))}
      </section>
    </main>
  );
};

export default Home;
