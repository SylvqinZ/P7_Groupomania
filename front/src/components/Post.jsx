import "../styles/css/style.css";

function Post() {
  return (
    <div className="container">
      <div id="post-id" className="post">
        <div className="post__avatar"></div>
        <div className="post__content">
          <div className="post__title">
            <b>Post Title</b>
          </div>
          <div className="post__date">
            <p>2022.09.19 // @User</p>
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
              <p>Like</p>

              <p>Dislike</p>

              <p>Update</p>

              <p>Delete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
