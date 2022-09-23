import Post from "../components/Post";

function Home() {
  return (
    <main>
      <h1>HOME</h1>

      <section className="posts">
        <Post></Post>
        <Post></Post>
        <Post></Post>
        <Post></Post>
        <Post></Post>
      </section>
    </main>
  );
}

export default Home;
