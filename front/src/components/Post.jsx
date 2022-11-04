import "../styles/css/style.css";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import avatar from "../logo/Default_pfp.svg.png";

const Post = (props) => {
  const [username, setUsername] = useState("");
  const userId = localStorage.getItem("userId") ?? "";
  const token = localStorage.getItem("token") ?? "none";

  // function Admin() {
  //   if (userId === "63650aabd1408498d5112e0c") {
  //     return Admin();
  //   }
  // }

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
        console.log(res);
      })
      .catch((err) => {
        setUsername("unknown");
        console.log("error");
        console.log(err);
      });
  }, [props.userId]);

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
      .post(`http://localhost:3000/api/posts/${props.id}/like`, {})
      .then((res) => {
        console.log(res);
        console.log("res");
      })
      .catch((err) => {
        console.log(err);
        console.log("error");
      });
  };

  if (userId === props.userId ) {
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
              <span className="dislike__btn">
                <i id="icon" className="fas fa-thumbs-down"></i>
              </span>
              <div className="dislike__counter">{props.dislikes}</div>
            </div>

            <NavLink to={`/update/${props.id}`}>
              <span className="update">
                <i id="icon" className=" fas fa-pen"></i>
              </span>
            </NavLink>

            <span
              className="delete"
              onClick={() => {
                DeletePost();
              }}
            >
              <i id="icon" className="fas fa-trash"></i>
            </span>
          </div>
        </div>
      </article>
    );
  } else {
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
            <div className="like">
              <span
                className="like__btn"
                onClick={() => {
                  HandleLike();
                }}
              >
                <i id="icon" className="fas fa-thumbs-up"></i>
              </span>
              <div className="like__counter">{props.likes}</div>
            </div>

            <div className="dislike">
              <span className="dislike__btn">
                <i id="icon" className="fas fa-thumbs-down"></i>
              </span>
              <div className="dislike__counter">{props.dislikes}</div>
            </div>

            <span className="update"></span>

            <span className="delete"></span>
          </div>
        </div>
      </article>
    );
  }
};

export default Post;
