import "../styles/css/style.css";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import avatar from "../logo/Default_pfp.svg.png";

const Post = (props) => {
  const [username, setUsername] = useState("");

  let userData = JSON.parse(localStorage.getItem("userData"));
  let userId = "";
  let token = "";
  let admin = "";

  if (userData) {
    userId = userData.userId;
    token = userData.token;
    admin = userData.admin;
  }

  function givePermission() {
    if (userId === props.userId || admin === true) {
      return true;
    } else {
      return false;
    }
  }
  // SET USERNAME
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/auth/${props.userId}`, {
        headers: {
          Authorization: `Basic ${token}`,
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
  }, [props.userId, token]);

  // DELETE POST
  function DeletePost() {
    let confirm = window.confirm("Supprimer la publication ?");
    if (confirm === true) handleDelete();
  }

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/api/posts/${props.id}`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [likes, setLikes] = useState();
  const [dislikes, setDislikes] = useState();
  const [usersLiked, setUsersLiked] = useState();

  const HandleLike = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/api/posts/${props.id}/like`, userId,{
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((res) => {
        
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        console.log("error");
      });
  };

  return (
    <article id={props.id} className="post">
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
                HandleLike(e);
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
                HandleLike(e);
              }}
            >
              <i id="icon" className="fas fa-thumbs-down"></i>
            </span>
            <div className="dislike__counter">{props.dislikes}</div>
          </div>

          {givePermission() && (
            <NavLink to={`/update/${props.id}`}>
              <span className="update">
                <i id="icon" className=" fas fa-pen"></i>
              </span>
            </NavLink>
          )}

          {givePermission() === false && <span className="delete"></span>}
          {givePermission() && (
            <span
              className="delete"
              onClick={() => {
                DeletePost();
              }}
            >
              <i id="icon" className="fas fa-trash"></i>
            </span>
          )}

          {givePermission() === false && <span className="delete"></span>}
        </div>
      </div>
    </article>
  );
};

export default Post;
