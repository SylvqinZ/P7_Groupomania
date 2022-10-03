import "../styles/css/style.css";


function Post() {
  return (
    <div className="container">
      <div id="post-897623" className="post">
        <div className="post__avatar"></div>
        <div className="post__content">
          <div className="post__title">
            <b>Post Title</b>
          </div>
          <div className="post__date">
            <p>@User - 2022.09.19 13:22:31 </p>
          </div>
          <div className="post__text">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. .
              Fugiat, unde quod? Cupiditate.Lorem ipsum dolor sit, amet
              consectetur adipisicing elit. . Fugiat, unde quod?
              Cupiditate.Lorem ipsum dolor sit, amet consectetur adipisicing
              elit. . Fugiat, unde quod? Cupiditate.Lorem ipsum dolor sit, amet
              consectetur adipisicing elit. . Fugiat, unde quod? Cupiditate.
            </p>
            <div className="post__img"></div>
            <div className="post__btn">
              <a>J'aime (x)</a>

              <a>Je n'aime pas (x)</a>

              <a>Modifier</a>

              <a>Supprimer</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
