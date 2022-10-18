import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Update = () => {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState([]);
  const [post, setPost] = useState([]);
  const { id } = useParams();

  /*function setTitle(title) {
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
  */
  function setTitle(newTitle) {
    setPost({ ...post, title: newTitle });
  }
  function setText(newText) {
    setPost({ ...post, text: newText });
  }
  function setImage(newImage) {
    setPost({ ...post, imageUrl: newImage });
  }

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setPreviewImage(res.data.imageUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", post.title);
    formData.append("text", post.text);
    formData.append("image", post.imageUrl);

    axios
      .put("http://localhost:3000/api/posts/" + id, formData)
      .then((res) => {
        console.log(res);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main>
      <h1>Modifier</h1>
      <div className="container">
        <form className="create" onSubmit={handleEdit}>
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
                Modifier
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Update;
