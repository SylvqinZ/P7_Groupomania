function Home() {
  return (
    <main>
      <h1>HOME</h1>

      <section className="posts">
        <div className="post">
          <div className="post__img"></div>
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
                Fugiat, unde quod? Cupiditate.
              </p>
              <div className="post__btn">
                <p>Like</p>

                <p>Dislike</p>

                <p>Update</p>

                <p>Delete</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
