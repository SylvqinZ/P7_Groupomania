import React, { useState } from "react";

export default function Create() {
  const [img, setImg] = useState();

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
  };

  return (
    <main>
      <h1>Creér un post</h1>
      <div className="container">
      <form className="create">
        <input
          className="create__title"
          placeholder="Votre Titre"
          type="text"
        />
        <textarea
          className="create__text"
          placeholder="Quoi de neuf ?"
          type="text"
        />

        <div className="create__image">
        <input
          id="file-input"
          className="image-input"
          type="file"
          accept="image/png, image/jpeg"
          onChange={onImageChange}
        />
            <img src={img} alt="" />
        </div>
        

        <div className="create__footer">
          <label className="create__label" htmlFor="file-input">
            <span>
              <i id="icon" className="fas fa-image"></i>
            </span>
          </label>

          <div className="create__btn">
            <input className="btn" value="Publier" type="submit" />
          </div>
        </div>
      </form>
      </div>
      
    </main>
  );
}
