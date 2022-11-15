import Post from "../components/Post";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getUserData, isLoggedIn } from "../utils/lib";
import { slice } from "lodash";
const Home = () => {
  const userData = getUserData();
  const [posts, setPosts] = useState([]);
  const [index, setIndex] = useState(3);
  const [isCompleted, setIsCompleted] = useState(false);
  const initialPosts = slice(posts, 0, index);

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

  const loadMore = () => {
    setIndex(index + 3);
    if (index >= posts.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };

  return (
    <main>
      {isLoggedIn() && <h1>Accueil</h1>}
      {isLoggedIn() === false && (
        <h1 className="home-message">
          Connectez-vous pour accéder aux publications
        </h1>
      )}

      <section className="posts">
        {initialPosts.map((post) => (
          <Post
            key={post._id}
            id={post._id ?? ""}
            userId={post.userId ?? ""}
            title={post.title ?? ""}
            text={post.text ?? ""}
            likes={post.likes ?? 0}
            dislikes={post.dislikes ?? 0}
            usersLiked={post.usersLiked ?? []}
            usersDisliked={post.usersDisliked ?? []}
            image={post.imageUrl ?? ""}
            date={new Date(post.updatedAt).toLocaleString("fr-FR")}
          />
        ))}
      </section>

      {isLoggedIn() && (
        <button onClick={loadMore} type="button" className="btn btn-load">
          Afficher plus
        </button>
      )}
    </main>
  );
};

export default Home;
