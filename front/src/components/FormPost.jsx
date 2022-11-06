import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Create = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  let userData = JSON.parse(localStorage.getItem("userData"));
  let userId = "";
  let token = "";

  if (userData) {
    userId = userData.userId;
    token = userData.token;
  }

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

  // IS LOGGED IN
  function isLoggedIn() {
    if ((userData, userId, token)) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    if (id !== post.id) {
      axios
        .get(`http://localhost:3000/api/posts/${id}`, {
          headers: {
            Authorization: `Basic ${token}`,
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
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("userId", userId);
    formData.append("title", post.title);
    formData.append("text", post.text);
    formData.append("image", post.imageUrl);

    if (id === post.id) {
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
    } else {
      axios
        .put("http://localhost:3000/api/posts/" + id, formData, {
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
    }
  };

  return (
    <main>
      {isLoggedIn() && post.id === id && <h1>Créez votre publication</h1>}
      {isLoggedIn() && post.id != id && <h1>Modifier votre publication</h1>}
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

            {isLoggedIn() && post.id != id && (
              <div className="create__btn">
                <button className="btn" type="submit">
                  Modifier
                </button>
              </div>
            )}
            {isLoggedIn() && post.id === id && (
              <div className="create__btn">
                <button className="btn" type="submit">
                  Publier
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </main>
  );
};

export default Create;
