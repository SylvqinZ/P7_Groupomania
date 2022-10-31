import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Create = () => {
  const [previewImage, setPreviewImage] = useState([]);
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId") ?? "";
  let token = localStorage.getItem("token") ?? "none";
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  function setTitle(title) {
    setPost({ ...post, title: title });
  }
  function setText(text) {
    setPost({ ...post, text: text });
  }
  function setImage(image) {
    setPost({ ...post, imageUrl: image });
  }

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let token = localStorage.getItem("token") ?? "none";
    let formData = new FormData();
    formData.append("userId", userId);
    formData.append("title", post.title);
    formData.append("text", post.text);
    formData.append("image", post.imageUrl);

    axios
      .post(`http://localhost:3000/api/posts`, formData, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((res) => {
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoggedIn) {
    return (
      <main>
        <h1>Creér un post</h1>
        <div className="container">
          <form className="create" onSubmit={handleSubmit}>
            <input
              className="create__title"
              placeholder="Votre Titre"
              name="title"
              type="text"
              value={post.title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="create__text"
              placeholder="Quoi de neuf ?"
              type="text"
              name="text"
              value={post.text}
              onChange={(e) => setText(e.target.value)}
            />

            <div className="create__image">
              <input id="file-input" className="image-input" name="file" type="file" onChange={onImageChange} />
              <img src={previewImage} alt="" />
            </div>

            <div className="create__footer">
              <label className="create__label" htmlFor="file-input">
                <span>
                  <i id="icon" className="fas fa-image"></i>
                </span>
              </label>

              <div className="create__btn">
                <button className="btn" type="submit">
                  Publier
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    );
  }
};

export default Create;
