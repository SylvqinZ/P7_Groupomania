import Post from "../components/Post";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const orderedDates = posts.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
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
        {orderedDates.map((post) => (
          <Post
            key={post._id}
            id={post._id}
            userId={post.userId}
            title={post.title}
            text={post.text}
            image={post.imageUrl}
            username={post.username}
            date={post.date}
            avatar=""
          />
        ))}
      </section>
    </main>
  );
};

export default Home;
