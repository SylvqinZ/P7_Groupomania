import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserData, isLoggedIn } from "../utils/lib";
import axios from "axios";

const FormPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userData = getUserData();
  const h1 = id === undefined ? "Créez votre publication" : "Modifier votre publication";
  const button = id === undefined ? "Publier" : "Modifier";

  const [previewImage, setPreviewImage] = useState([]);
  const [post, setPost] = useState({});

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

  useEffect(() => {
    if (id !== undefined) {
      axios
        .get(`http://localhost:3000/api/posts/${id}`, {
          headers: {
            Authorization: `Basic ${userData.token}`,
          },
        })
        .then((res) => {
          setPost(res.data);
          setPreviewImage(res.data.imageUrl);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id, post.id, userData.token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("userId", userData.userId);
    formData.append("title", post.title);
    formData.append("text", post.text);
    formData.append("image", post.imageUrl);

    const method = id === undefined ? "post" : "put";
    let url = "http://localhost:3000/api/posts/";
    url += id === undefined ? "" : id;
    axios({
      method: method,
      url: url,
      data: formData,
      headers: {
        Authorization: `Basic ${userData.token}`,
      },
    })
      .then((res) => {
        navigate("/home");
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  };

  return (
    <main>
      <h1>{h1}</h1>
      <div className="container">
        <form className="create" onSubmit={handleSubmit}>
          {isLoggedIn() && (
            <input
              className="create__title"
              placeholder="Votre Titre"
              name="title"
              type="text"
              value={post.title}
              onChange={(e) => setTitle(e.target.value)}
            />
          )}

          <textarea
            className="create__text"
            placeholder="Quoi de neuf ?"
            type="text"
            name="text"
            defaultValue={post.text}
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
                {button}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default FormPost;
