import Post from "../components/Post";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getUserData, isLoggedIn } from "../utils/lib";

const Home = () => {
  const userData = getUserData();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (isLoggedIn()) {
      axios
        .get(`http://localhost:3000/api/posts`, {
          headers: {
            Authorization: `Basic ${userData.token}`,
          },
        })
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userData.token]);

  return (
    <main>
      {isLoggedIn() && <h1>Accueil</h1>}
      {isLoggedIn() === false && <h1 className="home-message">Connectez-vous pour accéder aux publications</h1>}

      <section className="posts">
        {posts.map((post) => (
          <Post
            key={post._id}
            id={post._id ?? ''}
            userId={post.userId ?? ''}
            title={post.title ?? ''}
            text={post.text ?? ''}
            likes={post.likes ?? 0}
            dislikes={post.dislikes ?? 0}
            usersLiked={post.usersLiked ?? []}
            usersDisliked={post.usersDisliked ?? []}
            image={post.imageUrl ?? ''}
            date={new Date(post.updatedAt).toLocaleString("fr-FR")}
          />
        ))}
      </section>
    </main>
  );
};

export default Home;
