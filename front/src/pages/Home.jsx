import Post from "../components/Post";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const userId = localStorage.getItem("userId") ?? "";
  let token = localStorage.getItem("token") ?? "none";
  const [isLoggedIn, setIsLoggedIn] = useState();

  axios
    .get(`http://localhost:3000/api/auth/${userId}`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
    .then((res) => {
      setIsLoggedIn(true);
    })
    .catch((err) => {
      setIsLoggedIn(false);
      console.log(err);
    });

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
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isLoggedIn) {
    return (
      <main>
        <h1>Accueil</h1>
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
  } else {
    return (
      <main>
        <h1>Bienvenue sur Groupomania</h1>
        <h2 className="home-message">Connectez-vous pour accédez aux publications</h2>
      </main>
    );
  }
};

export default Home;
