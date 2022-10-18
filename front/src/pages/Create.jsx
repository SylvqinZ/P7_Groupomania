import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Create = () => {
  const [previewImage, setPreviewImage] = useState([]);
  const [post, setPost] = useState([]);
  const navigate = useNavigate();


  function setTitle(title) {
    post.title = title;
    setPost(post);
  }
  function setText(text) {
    post.text = text;
    setPost(post);
  }
  function setImage(imageUrl) {
    post.imageUrl = imageUrl;
    setPost(post);
  }

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("title", post.title);
    formData.append("text", post.text);
    formData.append("image", post.imageUrl);
    //formData.append("username", username);
    axios
      .post(`http://localhost:3000/api/posts`, formData)
      .then((res) => {
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main>
      <h1>Creér un post</h1>
      <div className="container">
        <form className="create" onSubmit={handleSubmit}>
          <input
            className="create__title"
            placeholder="Votre Titre"
            type="text"
            value={post.title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="create__text"
            placeholder="Quoi de neuf ?"
            type="text"
            value={post.text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="create__image">
            <input
              id="file-input"
              className="image-input"
              type="file"
              accept="image/png, image/jpeg"
              onChange={onImageChange}
            />
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
};

export default Create;
