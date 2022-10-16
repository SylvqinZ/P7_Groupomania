import "../styles/css/style.css";
import { NavLink } from "react-router-dom";

const Post = (props) => {
  const handleDelete = () => {
    fetch(`http://localhost:3000/api/posts/${props.id}`, {
      method: "DELETE",
    })
      .then((data) => {
        window.confirm("voulez-vous supprimer votre publication?");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
        console.error("There was an error!", err);
      });
  };

  return (
    <article id={props.id} className="post">
      <div className="post__avatar"></div>
      <div className="post__content">
        <div className="post__title">
          <h2> {props.title}</h2>
        </div>
        <div className="post__info">
          <div className="post__user">
            <p> {props.userName} -</p>
          </div>
          <div className="post__date">
            <p> {props.date} </p>
          </div>
        </div>

        <div className="post__text">
          <p> {props.text} </p>
        </div>

        <div className="post__image">
          <img src={props.image} alt="" />
        </div>

        <div className="post__btn">
          <div className="like">
            <span className="like__btn">
              <i id="icon" className="fas fa-thumbs-up"></i>
            </span>
            <div className="like__counter">(x)</div>
          </div>

          <div className="dislike">
            <span className="dislike__btn">
              <i id="icon" className="fas fa-thumbs-down"></i>
            </span>
            <div className="dislike__counter">(x)</div>
          </div>

          <NavLink to={`/update/${props.id}`}>
            <span className="update">
              <i id="icon" className=" fas fa-pen"></i>
            </span>
          </NavLink>

          <span className="delete" onClick={() => handleDelete()}>
            <i id="icon" className="fas fa-trash"></i>
          </span>
        </div>
      </div>
    </article>
  );
};

export default Post;
