import "../styles/css/style.css";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import avatar from "../logo/Default_pfp.svg.png";
import { getUserData, setUserData, isLoggedIn, isAuthorized } from "../utils/lib";

const Post = (props) => {
  const [username, setUsername] = useState("");
	const userData = getUserData();
	const authorized = isAuthorized(props.userId);

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
        setUsername("unknown");
        console.log("error");
        console.log(err);
      });
  }, [props.userId, userData.token]);

  // DELETE POST
  function deletePost() {
  	if(window.confirm("Supprimer la publication ?")) {
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

  const [likes, setLikes] = useState('?');
  const [dislikes, setDislikes] = useState('?');


  const handleLike = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/api/posts/${props.id}/like`, {
      	like: 0,								// 0 | 1 | -1
    	}, {
        headers: {
          Authorization: `Basic ${userData.token}`,
        },
      })
      .then((res) => {
        setLikes(res.likes);
        setDislikes(res.dislikes);
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
              className="like__btn"
              onClick={(e) => {
                handleLike(e);
              }}
            >
              <i id="icon" className="fas fa-thumbs-up"></i>
            </span>
            <div className="like__counter">{props.likes}</div>
          </div>

          <div className="dislike">
            <span
              className="dislike__btn"
              onClick={(e) => {
                handleLike(e);
              }}
            >
              <i id="icon" className="fas fa-thumbs-down"></i>
            </span>
            <div className="dislike__counter">{props.dislikes}</div>
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
