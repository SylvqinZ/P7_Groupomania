import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append(
      "post",
      JSON.stringify({
        title: title,
        text: text,
      })
    );
    formData.append("image", image);

    fetch("http://localhost:3000/api/posts", {
      method: "POST",
      body: formData,
    })
      .then((data) => {
        console.log(data);
        navigate("/home");
        console.log("post créé");
      })
      .catch((err) => {
        console.log("error");
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="create__text"
            placeholder="Quoi de neuf ?"
            type="text"
            value={text}
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
