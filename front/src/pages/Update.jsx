import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Update = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [post, setPost] = useState([]);
  const { id } = useParams();

  /*const onImageChange = (e) => {
    const [file] = e.target.files;
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };
  */

  useEffect(() => {
    fetch(`http://localhost:3000/api/posts/` + id)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        setPost(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEdit = () => {
    let formData = new FormData();
    formData.append("text", text);
    formData.append("title", title);

    formData.append("selectedFile", selectedFile);
    console.log(formData);
    axios
      .put("http://localhost:3000/api/posts/" + id, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => {
        console.log(data);
        console.log("balba");
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
            defaultValue={post.title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="create__text"
            placeholder="Quoi de neuf ?"
            type="text"
            name="text"
            defaultValue={post.text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="create__image">
            <input
              id="file-input"
              className="image-input"
              name="file"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <img src={post.imageUrl} alt="" />
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
