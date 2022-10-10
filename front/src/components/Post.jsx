import "../styles/css/style.css";
import { NavLink } from "react-router-dom";

function Post({ title, image, id, userName, date, text, like, dislike}) {
  
  return (
    <article id={id} className="post">
      <div className="post__avatar"></div>
      <div className="post__content">
        <div className="post__title">
          <h2> {title}</h2>
        </div>
        <div className="post__info">
          <div className="post__user">
            <p> {userName} -</p>
          </div>
          <div className="post__date">
            <p> {date} </p>
          </div>
        </div>

        <div className="post__text">
          <p> {text} </p>
        </div>

        <div className="post__image">
          <img src={image} alt="" />
        </div>

        <div className="post__btn">
          <div className="like-btn">
            <span className="like">
              <i id="icon" className="fas fa-thumbs-up"></i>
            </span>
            (x)
          </div>

          <div className="dislike-btn">
            <span className="dislike">
              <i id="icon" className="fas fa-thumbs-down"></i>
            </span>
            (x)
          </div>

          <NavLink to="/Update">
            <span className="update">
              <i id="icon" className=" fas fa-pen"></i>
            </span>
          </NavLink>

          <span className="delete">
            <i id="icon" class="fas fa-trash"></i>
          </span>
        </div>
      </div>
    </article>
  );
}

export default Post;
