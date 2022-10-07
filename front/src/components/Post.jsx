import "../styles/css/style.css";

function Post(props) {
  return (
    <div className="container">
      <div id="post-{real-post-id}" className="post">
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
            <a>J'aime (x)</a>

            <a>Je n'aime pas (x)</a>

            <a>Modifier</a>

            <a>Supprimer</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
