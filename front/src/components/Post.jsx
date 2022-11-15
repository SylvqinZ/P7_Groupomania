import "../styles/css/style.css";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import avatar from "../logo/Default_pfp.svg.png";
import {
  getUserData,
  setUserData,
  isLoggedIn,
  isAuthorized,
} from "../utils/lib";

const Post = (props) => {
  const [username, setUsername] = useState("unknown");
  const userData = getUserData();
  const authorized = isAuthorized(props.userId);

  const [likes, setLikes] = useState(props.likes);
  const [dislikes, setDislikes] = useState(props.dislikes);
  const [usersLiked, setUsersLiked] = useState(props.usersLiked);
  const [usersDisliked, setUsersDisliked] = useState(props.usersDisliked);
  const [likeActive, setLikeActive] = useState(
    usersLiked.includes(userData.userId)
  );

  const [dislikeActive, setDislikeActive] = useState(
    usersDisliked.includes(userData.userId)
  );


  

  // SET USERNAME
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/auth/${props.userId}`, {
        headers: {
          Authorization: `Basic ${userData.token}`,
        },
      })
      .then((res) => {
        setUsername(res.data);
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  }, [props.userId, userData.token]);

  // useEffect(() => {
  //   console.log("--------------------------------");
  //   console.log("likes", likes);
  //   console.log("dislikes", dislikes);
  // }, [likes, dislikes]);

  // DELETE POST
  function deletePost() {
    if (window.confirm("Supprimer la publication ?")) {
      axios
        .delete(`http://localhost:3000/api/posts/${props.id}`, {
          headers: {
            Authorization: `Basic ${userData.token}`,
          },
        })
        .then((res) => {
          document.getElementById(`post-${props.id}`).remove();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  

  
  const handleLike = (likeValue) => {
    
    if (likeValue === 1) {
      likeValue = likeActive === true ? 0 : 1;
    }
    if (likeValue === -1) {
      likeValue = dislikeActive === true ? 0 : -1;
    }

    axios
      .post(
        `http://localhost:3000/api/posts/${props.id}/like`,
        {
          like: likeValue, // 0, 1, -1
        },
        {
          headers: {
            Authorization: `Basic ${userData.token}`,
          },
        }
      )
      .then((res) => {
       
        setLikes(res.data.values.likes);
        setDislikes(res.data.values.dislikes);
        setUsersLiked(res.data.values.usersLiked);
        setUsersDisliked(res.data.values.usersDisliked);
        setLikeActive(res.data.values.usersLiked.includes(userData.userId));
        setDislikeActive(res.data.values.usersDisliked.includes(userData.userId));
        console.log(res.data.values);
      })
      .catch((err) => {
        console.log(err);
        console.log("error");
      });
  };

  return (
    <article id={`post-${props.id}`} className="post">
      <div className="post__avatar">
        <img id="avatar" src={avatar} alt="" />
      </div>
      <div className="post__content">
        <div className="post__title">
          <h2> {props.title}</h2>
        </div>
        <div className="post__info">
          <div className="post__user" id={props.userId}>
            <p> @{username} -</p>
          </div>
          <div className="post__date">
            <p>{props.date} </p>
          </div>
        </div>

        <div className="post__text">
          <p> {props.text} </p>
        </div>

        <div className="post__image">
          <img src={props.image} alt="" />
        </div>

        <div className="post__btn">
          <div id="like" className="like">
            <span
              className={`like__btn${likeActive ? " active" : ""}`}
              onClick={() => handleLike(1)}
            >
              <i id="icon" className="fas fa-thumbs-up"></i>
            </span>
            <div className="like__counter">{likes}</div>
          </div>

          <div id="dislike" className="dislike">
            <span
              className={`dislike__btn${dislikeActive ? " active" : ""}`}
              onClick={() => handleLike(-1)}
            >
              <i id="icon" className="fas fa-thumbs-down"></i>
            </span>
            <div className="dislike__counter">{dislikes}</div>
          </div>

          {authorized && (
            <NavLink to={`/update/${props.id}`}>
              <span className="update">
                <i id="icon" className="fas fa-pen"></i>
              </span>
            </NavLink>
          )}

          {authorized === false && <span className="delete"></span>}
          {authorized && (
            <span
              className="delete"
              onClick={() => {
                deletePost();
              }}
            >
              <i id="icon" className="fas fa-trash"></i>
            </span>
          )}

          {authorized === false && <span className="delete"></span>}
        </div>
      </div>
    </article>
  );
};

export default Post;
