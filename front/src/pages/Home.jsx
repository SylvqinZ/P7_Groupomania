import Post from "../components/Post";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  let userData = JSON.parse(localStorage.getItem("userData"));
  let userId = "";
  let token = "";

  if (userData) {
    userId = userData.userId;
    token = userData.token;
  }

  // IS LOGGED IN
  function isLoggedIn() {
    if ((userData, userId, token)) {
      return true;
    } else {
      return false;
    }
  }

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/posts`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main>
      {isLoggedIn() && <h1>Accueil</h1>}
      {isLoggedIn() === false && <h1>Connectez-vous pour accéder aux publications</h1>}

      <section className="posts">
        {posts.map((post) => (
          <Post
            key={post._id}
            id={post._id}
            userId={post.userId}
            title={post.title}
            text={post.text}
            likes={post.likes}
            dislikes={post.dislikes}
            usersLiked={post.usersLiked}
            image={post.imageUrl}
            date={new Date(post.updatedAt).toLocaleString("fr-FR")}
          />
        ))}
      </section>
    </main>
  );
};

export default Home;
